import { eq } from "drizzle-orm";
import { db } from "@/db";
import { roleEnum, userTable } from "@/db/schema";

export async function verifyInitialSetup(): Promise<boolean> {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.role, roleEnum.enumValues[0]));
  return !!user;
}
