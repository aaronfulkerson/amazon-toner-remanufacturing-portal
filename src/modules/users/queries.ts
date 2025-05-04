import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { permissionTable, userTable } from "@/db/schema";

import type { Permissions } from "@/db/queries";
import type { Roles } from "@/lib";

interface User {
  active: boolean;
  email: string;
  id: number;
  permissions: Permissions;
  role: Roles;
}

export async function getUsers(limit: number = 20, offset: number = 0) {
  const usersCte = db.$with("users_cte").as(
    db
      .select({
        active: userTable.active,
        email: userTable.email,
        id: userTable.id,
        permissions:
          sql<Permissions>`json_agg(${permissionTable.permission})`.as(
            "permissions"
          ),
        role: userTable.role,
      })
      .from(userTable)
      .leftJoin(permissionTable, eq(userTable.id, permissionTable.userId))
      .groupBy(userTable.active, userTable.email, userTable.id, userTable.role)
      .limit(limit)
      .offset(offset)
  );

  const result = await db
    .with(usersCte)
    .select({
      count: db.$count(userTable),
      users: sql<User[]>`json_agg(${usersCte})`,
    })
    .from(usersCte);

  return result[0];
}
