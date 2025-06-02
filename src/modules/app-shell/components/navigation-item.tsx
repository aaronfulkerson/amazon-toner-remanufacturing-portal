import { NavigationMenu } from "radix-ui";
import { requireAuthorizedSession } from "@/lib/auth/session.cached";
import { NavigationLink } from "@/modules/app-shell";

import type { Navigation as NavigationItemProps } from "@/modules/app-shell";

export async function NavigationItem({
  name,
  allowedRoles,
  ...item
}: NavigationItemProps) {
  const isAuthorized = await requireAuthorizedSession(allowedRoles);

  return isAuthorized ? (
    <NavigationMenu.Item>
      <NavigationLink {...item}>{name}</NavigationLink>
    </NavigationMenu.Item>
  ) : null;
}
