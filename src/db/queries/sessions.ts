import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";

import type { ValidSession } from "@/db/queries";
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
      user: { email: userTable.email, id: userTable.id, role: userTable.role },
      session: sessionTable,
    })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
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
