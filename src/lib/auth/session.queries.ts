import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { permissionTable, sessionTable, userTable } from "@/db/schema";

import type { SelectSession } from "@/db/schema";
import type { ValidSession } from "@/lib";
import type { UserPermissions } from "@/modules/users";

export async function getSessionById(
  sessionId: SelectSession["id"]
): Promise<ValidSession | undefined> {
  const result = await db
    .select({
      permissions: sql<UserPermissions>`json_agg(${permissionTable.permission})`,
      session: sessionTable,
      user: {
        active: userTable.active,
        email: userTable.email,
        id: userTable.id,
        name: userTable.name,
        role: userTable.role,
      },
    })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .leftJoin(permissionTable, eq(sessionTable.userId, permissionTable.userId))
    .where(and(eq(sessionTable.id, sessionId), eq(userTable.active, true)))
    .groupBy(
      sessionTable.id,
      userTable.active,
      userTable.email,
      userTable.id,
      userTable.role
    );
  if (result.length) return result[0];
}
