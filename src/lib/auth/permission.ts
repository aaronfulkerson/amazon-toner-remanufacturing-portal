import { SelectPermission, SelectUser } from "@/db/schema";

import type { Roles } from "@/modules";

export function checkPermissions(
  roles: Roles,
  role: SelectUser["role"],
  permissions: SelectPermission["permission"][]
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
