import { PERMISSION, USER_ROLE } from "@/db/schema";
import { ROUTES } from "@/modules";

import type { AllowedRoles } from "@/lib";

type RoutesKeys = keyof typeof ROUTES;
type ExcludedRoutesKeys = "LOGIN" | "ROOT" | "SETUP";
type AllowedRoutesKeys = Exclude<RoutesKeys, ExcludedRoutesKeys>;
type Permissions = {
  [k in AllowedRoutesKeys]: AllowedRoles;
};

export const PERMISSIONS: Permissions = {
  CARTRIDGES: {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: false,
    [USER_ROLE.EMPLOYEE]: false,
    [USER_ROLE.TECHNICIAN]: false,
  },
  DASHBOARD: {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: true,
    [USER_ROLE.EMPLOYEE]: true,
    [USER_ROLE.TECHNICIAN]: true,
  },
  PARTS: {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: false,
    [USER_ROLE.EMPLOYEE]: false,
    [USER_ROLE.TECHNICIAN]: false,
  },
  REMANUFACTURING: {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: false,
    [USER_ROLE.EMPLOYEE]: [PERMISSION.REMANUFACTURING],
    [USER_ROLE.TECHNICIAN]: false,
  },
  SALES: {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: [PERMISSION.TONER],
    [USER_ROLE.EMPLOYEE]: [PERMISSION.TONER],
    [USER_ROLE.TECHNICIAN]: false,
  },
  SERVICE: {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: false,
    [USER_ROLE.EMPLOYEE]: [PERMISSION.SERVICE],
    [USER_ROLE.TECHNICIAN]: [PERMISSION.SERVICE],
  },
  USERS: {
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: false,
    [USER_ROLE.EMPLOYEE]: false,
    [USER_ROLE.TECHNICIAN]: false,
  },
};
