import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";

import type { InsertSession, UpdateSession } from "@/db/schema";

export async function deleteSessionById(sessionId: string) {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function deleteSessionsByUserId(userId: number) {
  await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export async function getSessionById(sessionId: string) {
  return await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
}

export async function insertSession(session: InsertSession) {
  await db.insert(sessionTable).values(session);
}

export async function updateSession(sessionId: string, session: UpdateSession) {
  await db
    .update(sessionTable)
    .set(session)
    .where(eq(sessionTable.id, sessionId));
}
