import { NextResponse } from "next/server";
import { AUTHORIZATION_ERRORS, createServerResult, RESULT_TYPE } from "@/lib";
import { requireAuthorizedSession } from "@/lib/auth/session.cached";

import type { AllowedRoles, ServerResult } from "@/lib";

export async function authorizeRoute(
  allowedRoles: AllowedRoles
): Promise<NextResponse<ServerResult> | undefined> {
  const isAuthorized = await requireAuthorizedSession(allowedRoles);
  if (!isAuthorized)
    return NextResponse.json(
      createServerResult(
        AUTHORIZATION_ERRORS.NOT_AUTHORIZED,
        RESULT_TYPE.ERROR
      ),
      { status: 500 }
    );
}
