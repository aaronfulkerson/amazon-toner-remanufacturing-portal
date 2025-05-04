import { Permission, UserRole } from "@/db/schema";

export type ServerResultType = "error" | "info";
export type ServerResult =
  | { message: string; type: ServerResultType }
  | undefined;

type UserRoles = typeof UserRole;
type Permissions = typeof Permission;
export type Roles = {
  [r in UserRoles[keyof UserRoles]]: boolean | Permissions[keyof Permissions][];
};
