import { db } from "@/db";
import { userTable } from "@/db/schema";

import type { InsertUser } from "@/db/schema";

export async function insertUser(user: InsertUser) {
  await db.insert(userTable).values(user);
}
