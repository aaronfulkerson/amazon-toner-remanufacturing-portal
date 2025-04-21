"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { cnMerge } from "@/lib/ui";
import {
  navigationIconVariants,
  navigationLinkVariants,
} from "@/modules/app-shell";

import type { IconName } from "lucide-react/dynamic";

interface NavigationLinkProps extends React.ComponentProps<typeof Link> {
  icon?: IconName;
}

export function NavigationLink({
  children,
  href,
  icon,
  ...props
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href.toString());

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link
        href={href}
        className={cnMerge(navigationLinkVariants({ active: isActive }))}
        {...props}
      >
        {icon && (
          <DynamicIcon
            name={icon}
            aria-hidden="true"
            className={cnMerge(navigationIconVariants({ active: isActive }))}
          />
        )}
        {children}
      </Link>
    </NavigationMenu.Link>
  );
}
