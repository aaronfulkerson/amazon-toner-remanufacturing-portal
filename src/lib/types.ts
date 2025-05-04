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

type USER_ROLEs = typeof USER_ROLE;
type Permissions = typeof PERMISSION;
export type Roles = {
  [r in USER_ROLEs[keyof USER_ROLEs]]: boolean | Permissions[keyof Permissions][];
};
