import { eq } from "drizzle-orm";
import { db } from "@/db";
import { USER_ROLE, userTable } from "@/db/schema";

export async function verifyInitialSetup(): Promise<boolean> {
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.role, USER_ROLE.ADMIN));
  return !!result.length;
}
