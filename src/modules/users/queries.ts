import { eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { permissionTable, userTable } from "@/db/schema";

import type { SelectPermission, SelectUser } from "@/db/schema";

export type UserPermissions = (SelectPermission["permission"] | null)[];
interface User {
  active: SelectUser["active"];
  email: SelectUser["email"];
  id: SelectUser["id"];
  name: SelectUser["name"];
  permissions: UserPermissions;
  role: SelectUser["role"];
}

export async function getUsers(
  limit: number = 20,
  offset: number = 0,
  search?: string
): Promise<{ count: number; users: User[] }> {
  const usersCte = db.$with("users_cte").as(() => {
    const usersQuery = db
      .select({
        active: userTable.active,
        email: userTable.email,
        id: userTable.id,
        name: userTable.name,
        permissions:
          sql<UserPermissions>`json_agg(${permissionTable.permission})`.as(
            "permissions"
          ),
        role: userTable.role,
      })
      .from(userTable)
      .leftJoin(permissionTable, eq(userTable.id, permissionTable.userId))
      .groupBy(userTable.active, userTable.email, userTable.id, userTable.role)
      .limit(limit)
      .offset(offset);
    if (search) {
      const searchWithWildcard = `%${search}%`;
      usersQuery.where(
        or(
          ilike(userTable.email, searchWithWildcard),
          ilike(userTable.name, searchWithWildcard)
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
