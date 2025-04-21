import { eq } from "drizzle-orm";
import { db } from "@/db";
import { permissionTable } from "@/db/schema";

import type { InsertPermission, SelectPermission } from "@/db/schema";

export async function getPermissionsByUserId(
  userId: SelectPermission["userId"]
): Promise<SelectPermission[]> {
  return await db
    .select()
    .from(permissionTable)
    .where(eq(permissionTable.userId, userId));
}

export async function insertPermission(
  permission: InsertPermission,
  tx = db
): Promise<void> {
  await tx.insert(permissionTable).values(permission);
}
