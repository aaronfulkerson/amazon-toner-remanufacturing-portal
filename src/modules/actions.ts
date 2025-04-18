"use server";

import { redirect } from "next/navigation";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/auth/session";
import { ERROR_TYPES, ERRORS, ROUTES } from "@/modules";

import type { ActionResult } from "@/modules";

export async function logout(): Promise<ActionResult> {
  try {
    const { session } = await getCurrentSession();
    if (session === null) throw Error(ERRORS.NOT_AUTHENTICATED);

    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ERROR_TYPES.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
