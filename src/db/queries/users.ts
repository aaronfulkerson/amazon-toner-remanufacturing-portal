import { eq } from "drizzle-orm";
import { db } from "@/db";
import { roleEnum, userTable } from "@/db/schema";

import type { User, UserInsert } from "@/db/schema";

export async function createUser(user: UserInsert) {
  await db.insert(userTable).values(user);
}

export async function getUserByEmail(email: User["email"]) {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  return user;
}

export async function checkInitialSetup() {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.role, roleEnum.enumValues[0]));
  return !!user;
}
