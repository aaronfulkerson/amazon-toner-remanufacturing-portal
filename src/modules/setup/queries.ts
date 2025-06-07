import { eq } from "drizzle-orm";
import { db } from "@/db";
import { USER_ROLE, userTable } from "@/db/schema";

export async function checkInitialUserRoles(): Promise<{
  hasAdmin: boolean;
  hasDelegate: boolean;
}> {
  const [{ adminCount, delegateCount }] = await db
    .select({
      adminCount: db.$count(userTable, eq(userTable.role, USER_ROLE.ADMIN)),
      delegateCount: db.$count(
        userTable,
        eq(userTable.role, USER_ROLE.EMPLOYEE_DELEGATE)
      ),
    })
    .from(userTable);

  return { hasAdmin: adminCount > 0, hasDelegate: delegateCount > 0 };
}
