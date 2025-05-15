import { db } from "@/db";
import { permissionTable } from "@/db/schema";

import type { InsertPermission } from "@/db/schema";

export async function insertPermission(
  permission: InsertPermission
): Promise<void> {
  await db.insert(permissionTable).values(permission);
}
