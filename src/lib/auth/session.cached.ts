"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SESSION_ERRORS } from "@/lib";
import { validatePermissions } from "@/lib/auth/permissions";
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

export const authorizeCurrentSession = cache(
  async (allowedRoles: AllowedRoles): Promise<boolean | undefined> => {
    try {
      const { permissions, session, user } = await getCurrentSession();
      if (!session) throw Error(SESSION_ERRORS.SESSION_NOT_FOUND);

      return validatePermissions(allowedRoles, user.role, permissions);
    } catch (e) {
      if (
        e instanceof Error &&
        e.message === SESSION_ERRORS.SESSION_NOT_FOUND
      ) {
        redirect(ROUTES.LOGIN);
      }
    }
  }
);
