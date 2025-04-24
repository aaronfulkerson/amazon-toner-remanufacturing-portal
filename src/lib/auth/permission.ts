import { SelectUser } from "@/db/schema";

import type { Permissions } from "@/db/queries";
import type { Roles } from "@/modules";

export function checkPermissions(
  roles: Roles,
  role: SelectUser["role"],
  permissions: Permissions
) {
  let hasPermission = false;

  if (typeof roles[role] === "boolean") {
    hasPermission = roles[role];
  }

  if (typeof roles[role] === "object") {
    hasPermission = roles[role].some((p) => permissions.includes(p));
  }

  return hasPermission;
}
