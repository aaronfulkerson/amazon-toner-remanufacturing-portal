import { UserRole } from "@/db/schema";
import { NavigationItem, NavigationContainer } from "@/modules/app-shell";
import { Routes } from "@/modules/routes";

import type { NavigationItemProps } from "@/modules/app-shell";

const navigation: NavigationItemProps[] = [
  {
    name: "Dashboard",
    href: Routes.DASHBOARD,
    icon: "layout-dashboard",
    roles: {
      [UserRole.ADMIN]: true,
      [UserRole.CUSTOMER]: true,
      [UserRole.EMPLOYEE]: true,
      [UserRole.TECHNICIAN]: true,
    },
  },
  {
    name: "Remanufacturing",
    href: Routes.REMANUFACTURING,
    icon: "recycle",
    roles: {
      [UserRole.ADMIN]: true,
      [UserRole.CUSTOMER]: false,
      [UserRole.EMPLOYEE]: ["remanufacturing"],
      [UserRole.TECHNICIAN]: false,
    },
  },
  {
    name: "Service",
    href: Routes.SERVICE,
    icon: "cog",
    roles: {
      [UserRole.ADMIN]: true,
      [UserRole.CUSTOMER]: false,
      [UserRole.EMPLOYEE]: ["service"],
      [UserRole.TECHNICIAN]: ["service"],
    },
  },
  {
    name: "Toner Sales",
    href: Routes.TONER,
    icon: "printer",
    roles: {
      [UserRole.ADMIN]: true,
      [UserRole.CUSTOMER]: ["toner"],
      [UserRole.EMPLOYEE]: ["toner"],
      [UserRole.TECHNICIAN]: false,
    },
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
                {navigation.map((item) => (
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
