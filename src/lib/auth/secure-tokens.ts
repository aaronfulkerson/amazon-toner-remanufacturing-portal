import type { InsertSecureToken } from "@/db/schema";

export function createSecureToken(
  type: InsertSecureToken["type"],
  userId: InsertSecureToken["userId"]
): InsertSecureToken {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const token = crypto.randomUUID();
  return { expiresAt, token, type, userId };
}
