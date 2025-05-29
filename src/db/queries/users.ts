import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userTable, userTableNoPasswordHash } from "@/db/schema";

import type { DbContext } from "@/db/queries";
import type {
  InsertUser,
  SelectUser,
  SelectUserOmitPasswordHash,
  UpdateUser,
} from "@/db/schema";

export async function getUserByEmail(
  email: InsertUser["email"],
  ctx: DbContext = db
): Promise<SelectUserOmitPasswordHash | undefined> {
  const result = await ctx
    .select(userTableNoPasswordHash)
    .from(userTable)
    .where(eq(userTable.email, email));
  if (result.length) return result[0];
}

export async function insertUser(
  user: InsertUser,
  ctx: DbContext = db
): Promise<{ userId: SelectUser["id"] }[]> {
  return await ctx
    .insert(userTable)
    .values(user)
    .returning({ userId: userTable.id });
}

export async function updateUser(
  userId: SelectUser["id"],
  user: UpdateUser,
  ctx: DbContext = db
): Promise<void> {
  await ctx.update(userTable).set(user).where(eq(userTable.id, userId));
}
