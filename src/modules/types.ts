import { Permission, UserRole } from "@/db/schema";

export type ActionResultType = "error" | "info";
export type ActionResult =
  | { message: string; type: ActionResultType }
  | undefined;

type UserRoles = typeof UserRole;
type Permissions = typeof Permission;
export type Roles = {
  [r in UserRoles[keyof UserRoles]]: boolean | Permissions[keyof Permissions][];
};
