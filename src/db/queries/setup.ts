import { eq } from "drizzle-orm";
import { db } from "@/db";
import { UserRole, userTable } from "@/db/schema";

export async function verifyInitialSetup(): Promise<boolean> {
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.role, UserRole.ADMIN));
  return !!result.length;
}
