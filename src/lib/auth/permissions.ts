import { SelectUser } from "@/db/schema";

import type { Permissions } from "@/db/queries";
import type { AllowedRoles } from "@/lib";

export function validatePermissions(
  allowedRoles: AllowedRoles,
  userRole: SelectUser["role"],
  userPermissions: Permissions
): boolean {
  let hasPermission = false;

  if (typeof allowedRoles[userRole] === "boolean") {
    hasPermission = allowedRoles[userRole];
  }

  if (typeof allowedRoles[userRole] === "object") {
    hasPermission = allowedRoles[userRole].some((p) =>
      userPermissions.includes(p)
    );
  }

  return hasPermission;
}
