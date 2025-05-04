import { NextResponse } from "next/server";
import { Errors, ErrorType } from "@/modules";
import { authorizeCurrentSession } from "@/lib/auth/actions";

import type { ServerResult, Roles } from "@/modules";

export async function authorizeRoute(
  roles: Roles
): Promise<NextResponse<ServerResult> | undefined> {
  const hasPermission = await authorizeCurrentSession(roles);
  if (!hasPermission)
    return NextResponse.json<ServerResult>(
      {
        message: Errors.NOT_AUTHENTICATED,
        type: ErrorType.ERROR,
      },
      { status: 500 }
    );
}
