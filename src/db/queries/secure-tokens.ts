import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { secureTokenTable } from "@/db/schema";

import type { DbContext } from "@/db/queries";
import type { InsertSecureToken, SelectSecureToken } from "@/db/schema";

export async function deleteSecureTokenById(id: SelectSecureToken["id"]) {
  await db.delete(secureTokenTable).where(eq(secureTokenTable.id, id));
}

export async function deleteSecureTokenByUserId(
  userId: SelectSecureToken["userId"]
) {
  await db.delete(secureTokenTable).where(eq(secureTokenTable.userId, userId));
}

export async function getSecureToken(
  token: SelectSecureToken["token"],
  type: SelectSecureToken["type"]
): Promise<SelectSecureToken | undefined> {
  const result = await db
    .select()
    .from(secureTokenTable)
    .where(
      and(eq(secureTokenTable.token, token), eq(secureTokenTable.type, type))
    );

  if (result.length) return result[0];
}

export async function insertSecureToken(
  secureToken: InsertSecureToken,
  ctx: DbContext = db
): Promise<void> {
  await ctx.insert(secureTokenTable).values(secureToken);
}
