import { NavigationMenu } from "radix-ui";
import { Permission, UserRole } from "@/db/schema";
import { getPermissions } from "@/lib/auth/permission";
import { Routes } from "@/modules";
import { NavigationLink } from "@/modules/app-shell";

import type { IconName } from "lucide-react/dynamic";

type Route = typeof Routes;
type UserRoles = typeof UserRole;
type Permissions = typeof Permission;
export interface NavigationItemProps {
  name: string;
  href: Route[keyof Route];
  icon?: IconName;
  roles: {
    [r in UserRoles[keyof UserRoles]]:
      | boolean
      | Permissions[keyof Permissions][];
  };
}

export async function NavigationItem({
  name,
  roles,
  ...item
}: NavigationItemProps) {
  const { permissions, role } = await getPermissions();

  let roleHasPermission = false;

  if (typeof roles[role] === "boolean") {
    roleHasPermission = roles[role];
  }

  if (typeof roles[role] === "object") {
    roleHasPermission = roles[role].some((p) => permissions.includes(p));
  }

  return roleHasPermission ? (
    <NavigationMenu.Item>
      <NavigationLink {...item}>{name}</NavigationLink>
    </NavigationMenu.Item>
  ) : null;
}
