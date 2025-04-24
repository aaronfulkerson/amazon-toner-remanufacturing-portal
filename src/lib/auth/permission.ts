import { SelectUser } from "@/db/schema";

import type { Permissions } from "@/db/queries";
import type { Roles } from "@/modules";

export function validatePermissions(
  roles: Roles,
  userRole: SelectUser["role"],
  userPermissions: Permissions
): boolean {
  let hasPermission = false;

  if (typeof roles[userRole] === "boolean") {
    hasPermission = roles[userRole];
  }

  if (typeof roles[userRole] === "object") {
    hasPermission = roles[userRole].some((p) => userPermissions.includes(p));
  }

  return hasPermission;
}
