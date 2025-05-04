import type { NextRequest, NextResponse } from "next/server";
import type { Permission, UserRole } from "@/db/schema";

export type InferRoute<T> = T extends (
  request: NextRequest
) => Promise<NextResponse<infer U>>
  ? U
  : never;

export type ServerResultType = "error" | "info";
export type ServerResult =
  | { message: string; type: ServerResultType }
  | undefined;

type UserRoles = typeof UserRole;
type Permissions = typeof Permission;
export type Roles = {
  [r in UserRoles[keyof UserRoles]]: boolean | Permissions[keyof Permissions][];
};
