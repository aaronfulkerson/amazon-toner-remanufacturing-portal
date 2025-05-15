"use server";

import { redirect } from "next/navigation";
import { RESULT_TYPE, SESSION_ERRORS } from "@/lib";
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from "@/lib/auth/session";
import { getCurrentSession } from "@/lib/auth/session.cached";
import { ROUTES } from "@/modules";

import type { ServerResult } from "@/lib";

export async function logout(): Promise<ServerResult> {
  try {
    const { session } = await getCurrentSession();
    if (!session) throw Error(SESSION_ERRORS.SESSION_NOT_FOUND);

    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: RESULT_TYPE.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
