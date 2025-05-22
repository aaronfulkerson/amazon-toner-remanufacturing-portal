"use server";

import { redirect } from "next/navigation";
import { handleError } from "@/lib";
import {
  createSession,
  generateSessionToken,
  invalidateAllSessions,
  setSessionTokenCookie,
} from "@/lib/auth/session";
import { ROUTES } from "@/modules";
import { validate } from "@/modules/login";

import type { ServerResult } from "@/lib";

export async function login(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const user = await validate(formData);

    await invalidateAllSessions(user.id);

    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    await setSessionTokenCookie(token, session.expiresAt);
  } catch (e: unknown) {
    return handleError(e);
  }

  redirect(ROUTES.DASHBOARD);
}
