import { NextResponse } from "next/server";
import { AUTHENTICATION_ERRORS, RESULT_TYPE } from "@/lib";
import { authorizeCurrentSession } from "@/lib/auth/session.cached";

import type { AllowedRoles, ServerResult } from "@/lib";

export async function authorizeRoute(
  allowedRoles: AllowedRoles
): Promise<NextResponse<ServerResult> | undefined> {
  const hasPermission = await authorizeCurrentSession(allowedRoles);
  if (!hasPermission)
    return NextResponse.json<ServerResult>(
      {
        message: AUTHENTICATION_ERRORS.NOT_AUTHENTICATED,
        type: RESULT_TYPE.ERROR,
      },
      { status: 500 }
    );
}
