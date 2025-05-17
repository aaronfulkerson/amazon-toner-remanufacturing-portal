import { PERMISSIONS, ROUTES } from "@/modules";
import { NavigationItem, NavigationContainer } from "@/modules/app-shell";

import type { IconName } from "lucide-react/dynamic";
import type { AllowedRoles } from "@/lib";

type RoutesObj = typeof ROUTES;
export interface Navigation {
  name: string;
  href: RoutesObj[keyof RoutesObj];
  icon?: IconName;
  allowedRoles: AllowedRoles;
}

const mainNavigation: Navigation[] = [
  {
    name: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: "layout-dashboard",
    allowedRoles: PERMISSIONS.DASHBOARD,
  },
  {
    name: "Remanufacturing",
    href: ROUTES.REMANUFACTURING,
    icon: "recycle",
    allowedRoles: PERMISSIONS.REMANUFACTURING,
  },
  {
    name: "Service",
    href: ROUTES.SERVICE,
    icon: "cog",
    allowedRoles: PERMISSIONS.SERVICE,
  },
  {
    name: "Toner Sales",
    href: ROUTES.SALES,
    icon: "badge-dollar-sign",
    allowedRoles: PERMISSIONS.SALES,
  },
];

const subNavigation: Navigation[] = [
  {
    name: "Parts",
    href: ROUTES.PARTS,
    icon: "bolt",
    allowedRoles: PERMISSIONS.PARTS,
  },
  {
    name: "Toner Cartridges",
    href: ROUTES.CARTRIDGES,
    icon: "printer",
    allowedRoles: PERMISSIONS.CARTRIDGES,
  },
  {
    name: "Users",
    href: ROUTES.USERS,
    icon: "users",
    allowedRoles: PERMISSIONS.USERS,
  },
];

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center font-bold">
          Amazon Toner
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <NavigationContainer>
                {mainNavigation.map((item) => (
                  <NavigationItem {...item} key={item.name} />
                ))}
              </NavigationContainer>
            </li>
            <li>
              <NavigationContainer>
                {subNavigation.map((item) => (
                  <NavigationItem {...item} key={item.name} />
                ))}
              </NavigationContainer>
            </li>
            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-50"
                />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
