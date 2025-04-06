import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userTable } from "@/db/schema";

import type { User } from "@/db/schema";

export async function getUserByEmail(
  email: User["email"]
): Promise<User | undefined> {
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  if (result.length) return result[0];
}
