"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { SessionErrors } from "@/lib/auth/errors";
import { validatePermissions } from "@/lib/auth/permission";
import { validateSessionToken } from "@/lib/auth/session";

import type { SessionValidationResult } from "@/db/queries";
import type { Roles } from "@/modules";

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value ?? null;
    if (token === null) {
      return { permissions: null, session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  }
);

export const authorizeCurrentSession = cache(
  async (roles: Roles): Promise<boolean> => {
    const { permissions, user } = await getCurrentSession();
    if (!user) throw Error(SessionErrors.SESSION_NOT_FOUND);

    return validatePermissions(roles, user.role, permissions);
  }
);
