"use server";

import { redirect } from "next/navigation";
import { handleError } from "@/lib";
import { verifyPasswordHash } from "@/lib/auth/password";
import {
  createSession,
  generateSessionToken,
  invalidateAllSessions,
  setSessionTokenCookie,
} from "@/lib/auth/session";
import { ROUTES } from "@/modules";
import { getUserForLogin, LOGIN_ERRORS, validate } from "@/modules/login";

import type { ServerResult } from "@/lib";

export async function login(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const data = validate(formData);

    const user = await getUserForLogin(data.email);
    if (!user) throw Error(LOGIN_ERRORS.INVALID_CREDENTIALS);

    const authenticated = await verifyPasswordHash(
      user.passwordHash,
      data.password
    );
    if (!authenticated) throw Error(LOGIN_ERRORS.INVALID_CREDENTIALS);

    await invalidateAllSessions(user.id);

    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    await setSessionTokenCookie(token, session.expiresAt);
  } catch (e: unknown) {
    return handleError(e);
  }

  redirect(ROUTES.DASHBOARD);
}
