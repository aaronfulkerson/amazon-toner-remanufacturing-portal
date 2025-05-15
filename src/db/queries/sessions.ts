import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessionTable } from "@/db/schema";

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

export async function insertSession(session: InsertSession): Promise<void> {
  await db.insert(sessionTable).values(session);
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
