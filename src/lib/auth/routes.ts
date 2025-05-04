import { NextResponse } from "next/server";
import { AUTHENTICATION, ERROR_TYPE } from "@/lib";
import { authorizeCurrentSession } from "@/lib/auth/actions";

import type { AllowedRoles, ServerResult } from "@/lib";

export async function authorizeRoute(
  allowedRoles: AllowedRoles
): Promise<NextResponse<ServerResult> | undefined> {
  const hasPermission = await authorizeCurrentSession(allowedRoles);
  if (!hasPermission)
    return NextResponse.json<ServerResult>(
      {
        message: AUTHENTICATION.NOT_AUTHENTICATED,
        type: ERROR_TYPE.ERROR,
      },
      { status: 500 }
    );
}
