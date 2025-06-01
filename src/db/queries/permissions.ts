import { eq } from "drizzle-orm";
import { db } from "@/db";
import { permissionTable } from "@/db/schema";

import type { DbContext } from "@/db/queries";
import type { InsertPermission } from "@/db/schema";

export async function insertPermissions(
  permissions: InsertPermission[],
  ctx: DbContext = db
): Promise<void> {
  await ctx.insert(permissionTable).values(permissions);
}

export async function deletePermissions(
  userId: InsertPermission["userId"],
  ctx: DbContext = db
) {
  await ctx.delete(permissionTable).where(eq(permissionTable.userId, userId));
}
