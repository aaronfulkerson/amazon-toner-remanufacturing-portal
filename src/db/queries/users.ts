import { db } from "@/db";
import { userTable } from "@/db/schema";

import type { InsertUser } from "@/db/schema";

export async function insertUser(
  user: InsertUser,
  tx = db
): Promise<{ userId: number }[]> {
  return await tx
    .insert(userTable)
    .values(user)
    .returning({ userId: userTable.id });
}
