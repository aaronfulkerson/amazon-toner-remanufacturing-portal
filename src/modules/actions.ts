"use server";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/actions";
import { ERROR_TYPE, SESSION_ERRORS } from "@/lib";
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from "@/lib/auth/session";
import { Routes } from "@/modules";

import type { ServerResult } from "@/lib";

export async function logout(): Promise<ServerResult> {
  try {
    const { session } = await getCurrentSession();
    if (!session) throw Error(SESSION_ERRORS.SESSION_NOT_FOUND);

    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ERROR_TYPE.ERROR };
  }

  redirect(Routes.LOGIN);
}
