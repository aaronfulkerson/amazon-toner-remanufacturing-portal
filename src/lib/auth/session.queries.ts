import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  permissionTable,
  sessionTable,
  userTable,
  userTableNoPasswordHash,
} from "@/db/schema";

import type { SelectSession } from "@/db/schema";
import type { ValidSession } from "@/lib";
import type { UserPermissions } from "@/modules/users";

export async function getSessionById(
  sessionId: SelectSession["id"]
): Promise<ValidSession | undefined> {
  const result = await db
    .select({
      permissions: sql<UserPermissions>`json_agg(${permissionTable.name})`,
      session: sessionTable,
      user: userTableNoPasswordHash,
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
