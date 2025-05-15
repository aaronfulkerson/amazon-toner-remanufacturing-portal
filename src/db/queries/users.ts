import { db } from "@/db";
import { userTable } from "@/db/schema";

import type { InsertUser, SelectUser } from "@/db/schema";

export async function insertUser(
  user: InsertUser
): Promise<{ userId: SelectUser["id"] }[]> {
  return await db
    .insert(userTable)
    .values(user)
    .returning({ userId: userTable.id });
}
