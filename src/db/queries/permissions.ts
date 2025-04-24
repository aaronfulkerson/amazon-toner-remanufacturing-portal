import { db } from "@/db";
import { permissionTable } from "@/db/schema";

import type { InsertPermission } from "@/db/schema";

export async function insertPermission(
  permission: InsertPermission,
  tx = db
): Promise<void> {
  await tx.insert(permissionTable).values(permission);
}
