import { asc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { insertPermissions, insertSecureToken, insertUser } from "@/db/queries";
import {
  permissionTable,
  SECURE_TOKEN_TYPE,
  userTable,
  userTableNoPasswordHash,
} from "@/db/schema";
import { generateSecureToken } from "@/lib/auth/secure-tokens";

import type {
  InsertPermission,
  InsertUser,
  SelectPermission,
  SelectUserOmitPasswordHash,
} from "@/db/schema";

export type UserPermissions = (SelectPermission["name"] | null)[];
interface User extends SelectUserOmitPasswordHash {
  permissions: UserPermissions;
}

export async function getUsers(
  limit: number = 10,
  offset: number = 0,
  search?: string
): Promise<{ count: number; users: User[] }> {
  const usersCte = db.$with("users_cte").as(() => {
    const usersQuery = db
      .select({
        ...userTableNoPasswordHash,
        permissions: sql<UserPermissions>`json_agg(${permissionTable.name})`.as(
          "permissions"
        ),
      })
      .from(userTable)
      .leftJoin(permissionTable, eq(userTable.id, permissionTable.userId))
      .groupBy(userTable.active, userTable.email, userTable.id, userTable.role)
      .limit(limit)
      .offset(offset)
      .orderBy(asc(userTable.id));
    if (search) {
      const wildcardSearch = `%${search}%`;
      usersQuery.where(
        or(
          ilike(userTable.email, wildcardSearch),
          ilike(userTable.name, wildcardSearch)
        )
      );
    }
    return usersQuery;
  });

  const result = await db
    .with(usersCte)
    .select({
      count: db.$count(userTable),
      users: sql<User[]>`coalesce(json_agg(${usersCte}), '[]')`,
    })
    .from(usersCte);

  return result[0];
}

export async function insertUserWithPermissions(
  user: InsertUser,
  permissions: InsertPermission["name"][]
) {
  return await db.transaction(async (tx) => {
    const [{ userId }] = await insertUser(user, tx);

    const secureToken = generateSecureToken(
      SECURE_TOKEN_TYPE.EMAIL_CONFIRMATION,
      userId
    );
    await insertSecureToken(secureToken, tx);

    if (permissions.length)
      await insertPermissions(
        permissions.map((name) => ({ name, userId })),
        tx
      );

    return secureToken.token;
  });
}
