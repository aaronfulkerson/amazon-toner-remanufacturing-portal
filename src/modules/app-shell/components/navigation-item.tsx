import { NavigationMenu } from "radix-ui";
import { authorizeCurrentSession } from "@/lib/auth/actions";
import { NavigationLink } from "@/modules/app-shell";

import type { Navigation as NavigationItemProps } from "@/modules/app-shell";

export async function NavigationItem({
  name,
  roles,
  ...item
}: NavigationItemProps) {
  const hasPermission = await authorizeCurrentSession(roles);

  return hasPermission ? (
    <NavigationMenu.Item>
      <NavigationLink {...item}>{name}</NavigationLink>
    </NavigationMenu.Item>
  ) : null;
}
