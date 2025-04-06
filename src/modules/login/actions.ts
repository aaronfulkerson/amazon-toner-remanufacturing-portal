"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/auth/session";
import { ERROR_TYPES, ROUTES } from "@/modules";
import { validate } from "@/modules/login";

import type { ActionResult } from "@/modules/types";

export async function login(
  prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const user = await validate(formData);

    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    await setSessionTokenCookie(token, session.expiresAt);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ERROR_TYPES.ERROR };
  }

  redirect(ROUTES.DASHBOARD);
}
