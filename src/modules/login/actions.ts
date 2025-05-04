"use server";

import { redirect } from "next/navigation";
import { ERROR_TYPE } from "@/lib";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/auth/session";
import { Routes } from "@/modules";
import { validate } from "@/modules/login";

import type { ServerResult } from "@/lib";

export async function login(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const user = await validate(formData);

    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    await setSessionTokenCookie(token, session.expiresAt);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ERROR_TYPE.ERROR };
  }

  redirect(Routes.DASHBOARD);
}
