import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { permissionTable, sessionTable, userTable } from "@/db/schema";

import type { Permissions, ValidSession } from "@/db/queries";
import type { InsertSession, SelectSession, UpdateSession } from "@/db/schema";

export async function deleteSessionById(
  sessionId: SelectSession["id"]
): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function deleteSessionsByUserId(
  userId: SelectSession["userId"]
): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export async function getSessionById(
  sessionId: SelectSession["id"]
): Promise<ValidSession | undefined> {
  const result = await db
    .select({
      permissions: sql<Permissions>`json_agg(${permissionTable.permission})`,
      session: sessionTable,
      user: {
        active: userTable.active,
        email: userTable.email,
        id: userTable.id,
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

export async function insertSession(
  session: InsertSession,
  tx = db
): Promise<void> {
  await tx.insert(sessionTable).values(session);
}

export async function updateSession(
  sessionId: SelectSession["id"],
  session: UpdateSession
): Promise<void> {
  await db
    .update(sessionTable)
    .set(session)
    .where(eq(sessionTable.id, sessionId));
}
