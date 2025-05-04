import { NavigationMenu } from "radix-ui";
import { authorizeCurrentSession } from "@/lib/auth/actions";
import { NavigationLink } from "@/modules/app-shell";

import type { Navigation as NavigationItemProps } from "@/modules/app-shell";

export async function NavigationItem({
  name,
  allowedRoles,
  ...item
}: NavigationItemProps) {
  const hasPermission = await authorizeCurrentSession(allowedRoles);

  return hasPermission ? (
    <NavigationMenu.Item>
      <NavigationLink {...item}>{name}</NavigationLink>
    </NavigationMenu.Item>
  ) : null;
}
