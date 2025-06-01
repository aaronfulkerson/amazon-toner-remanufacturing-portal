import { NextResponse } from "next/server";
import { AUTHORIZATION_ERRORS, getServerResult, RESULT_TYPE } from "@/lib";
import { authorizeCurrentSession } from "@/lib/auth/session.cached";

import type { AllowedRoles, ServerResult } from "@/lib";

export async function authorizeRoute(
  allowedRoles: AllowedRoles
): Promise<NextResponse<ServerResult> | undefined> {
  const hasPermission = await authorizeCurrentSession(allowedRoles);
  if (!hasPermission)
    return NextResponse.json(
      getServerResult(AUTHORIZATION_ERRORS.NOT_AUTHORIZED, RESULT_TYPE.ERROR),
      { status: 500 }
    );
}
