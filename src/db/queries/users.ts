import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userTable } from "@/db/schema";

import type { InsertUser, SelectUser, UpdateUser } from "@/db/schema";

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
