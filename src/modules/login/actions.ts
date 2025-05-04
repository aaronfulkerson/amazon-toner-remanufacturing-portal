"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/auth/session";
import { ErrorType, Routes } from "@/modules";
import { validate } from "@/modules/login";

import type { ServerResult } from "@/modules/types";

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
      return { message: e.message, type: ErrorType.ERROR };
  }

  redirect(Routes.DASHBOARD);
}
