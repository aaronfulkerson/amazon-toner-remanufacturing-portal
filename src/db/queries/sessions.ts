import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";

import type {
  InsertSession,
  Session,
  UpdateSession,
  UserWithoutPasswordHash,
} from "@/db/schema";

export async function deleteSessionById(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function deleteSessionsByUserId(userId: number): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export async function getSessionById(
  sessionId: string
): Promise<{ session: Session; user: UserWithoutPasswordHash }[]> {
  return await db
    .select({
      user: { email: userTable.email, id: userTable.id, role: userTable.role },
      session: sessionTable,
    })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
}

export async function insertSession(session: InsertSession): Promise<void> {
  await db.insert(sessionTable).values(session);
}

export async function updateSession(
  sessionId: string,
  session: UpdateSession
): Promise<void> {
  await db
    .update(sessionTable)
    .set(session)
    .where(eq(sessionTable.id, sessionId));
}
