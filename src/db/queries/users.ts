import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userTable, userTableNoPasswordHash } from "@/db/schema";

import type {
  InsertUser,
  SelectUser,
  SelectUserOmitPasswordHash,
  UpdateUser,
} from "@/db/schema";

export async function getUserByEmail(
  email: InsertUser["email"]
): Promise<SelectUserOmitPasswordHash | undefined> {
  const result = await db
    .select(userTableNoPasswordHash)
    .from(userTable)
    .where(eq(userTable.email, email));
  if (result.length) return result[0];
}

export async function insertUser(
  user: InsertUser
): Promise<{ userId: SelectUser["id"] }[]> {
  return await db
    .insert(userTable)
    .values(user)
    .returning({ userId: userTable.id });
}

export async function updateUser(userId: SelectUser["id"], user: UpdateUser) {
  await db.update(userTable).set(user).where(eq(userTable.id, userId));
}
