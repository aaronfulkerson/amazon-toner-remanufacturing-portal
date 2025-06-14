"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { hasPermission } from "@/lib/auth/permissions";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth/session";
import { ROUTES } from "@/modules";

import type { AllowedRoles, SessionValidationResult } from "@/lib";

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
    if (token === null) {
      return { permissions: null, session: null, user: null };
    }
    return await validateSessionToken(token);
  }
);

export const requireAuthorizedSession = cache(
  async (allowedRoles: AllowedRoles): Promise<boolean | undefined> => {
    const { permissions, session, user } = await getCurrentSession();
    if (!session) redirect(ROUTES.LOGIN);

    return hasPermission(allowedRoles, user.role, permissions);
  }
);
