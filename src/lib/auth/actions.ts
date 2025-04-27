"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SessionErrors } from "@/lib/auth/errors";
import { validatePermissions } from "@/lib/auth/permission";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth/session";
import { Routes } from "@/modules";

import type { SessionValidationResult } from "@/db/queries";
import type { Roles } from "@/modules";

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
  async (roles: Roles): Promise<boolean | undefined> => {
    try {
      const { permissions, session, user } = await getCurrentSession();
      if (!session) throw Error(SessionErrors.SESSION_NOT_FOUND);

      return validatePermissions(roles, user.role, permissions);
    } catch (e) {
      if (e instanceof Error && e.message === SessionErrors.SESSION_NOT_FOUND) {
        redirect(Routes.LOGIN);
      }
    }
  }
);
