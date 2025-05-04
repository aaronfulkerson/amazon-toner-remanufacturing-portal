import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessionTable } from "@/db/schema";

import type { InsertSession, SelectSession, UpdateSession } from "@/db/schema";

export async function deleteSessionById(
  sessionId: SelectSession["id"],
  tx = db
): Promise<void> {
  await tx.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function deleteSessionsByUserId(
  userId: SelectSession["userId"],
  tx = db
): Promise<void> {
  await tx.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export async function insertSession(
  session: InsertSession,
  tx = db
): Promise<void> {
  await tx.insert(sessionTable).values(session);
}

export async function updateSession(
  sessionId: SelectSession["id"],
  session: UpdateSession,
  tx = db
): Promise<void> {
  await tx
    .update(sessionTable)
    .set(session)
    .where(eq(sessionTable.id, sessionId));
}
