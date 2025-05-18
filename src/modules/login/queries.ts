import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { userTable } from "@/db/schema";

import type { SelectUser } from "@/db/schema";

export async function getUserByEmail(
  email: SelectUser["email"]
): Promise<SelectUser | undefined> {
  const result = await db
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.email, email),
        eq(userTable.active, true),
        eq(userTable.emailConfirmed, true)
      )
    );
  if (result.length) return result[0];
}
