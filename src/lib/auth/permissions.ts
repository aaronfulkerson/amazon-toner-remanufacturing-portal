import { SelectUser } from "@/db/schema";

import type { AllowedRoles } from "@/lib";
import type { UserPermissions } from "@/modules/users";

export function hasPermission(
  allowedRoles: AllowedRoles,
  userRole: SelectUser["role"],
  userPermissions: UserPermissions
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
