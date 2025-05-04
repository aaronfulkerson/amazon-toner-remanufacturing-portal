import type { NextRequest, NextResponse } from "next/server";
import type { PERMISSION, USER_ROLE } from "@/db/schema";

export type InferRoute<T> = T extends (
  request: NextRequest
) => Promise<NextResponse<infer U>>
  ? U
  : never;

export type ServerResultType = "error" | "info";
export type ServerResult =
  | { message: string; type: ServerResultType }
  | undefined;

type UserRoleObj = typeof USER_ROLE;
type UserRoles = UserRoleObj[keyof UserRoleObj];
type PermissionObj = typeof PERMISSION;
type Permissions = PermissionObj[keyof PermissionObj][];
export type AllowedRoles = {
  [k in UserRoles]: boolean | Permissions;
};
