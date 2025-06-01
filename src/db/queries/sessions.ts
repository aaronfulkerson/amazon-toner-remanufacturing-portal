import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessionTable } from "@/db/schema";

import type { DbContext } from "@/db/queries";
import type { InsertSession, SelectSession, UpdateSession } from "@/db/schema";

export async function deleteSessionById(
  sessionId: SelectSession["id"],
  ctx: DbContext = db
): Promise<void> {
  await ctx.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function deleteSessionsByUserId(
  userId: SelectSession["userId"],
  ctx: DbContext = db
): Promise<void> {
  await ctx.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export async function insertSession(
  session: InsertSession,
  ctx: DbContext = db
): Promise<void> {
  await ctx.insert(sessionTable).values(session);
}

export async function updateSession(
  sessionId: SelectSession["id"],
  session: UpdateSession,
  ctx: DbContext = db
): Promise<void> {
  await ctx
    .update(sessionTable)
    .set(session)
    .where(eq(sessionTable.id, sessionId));
}
