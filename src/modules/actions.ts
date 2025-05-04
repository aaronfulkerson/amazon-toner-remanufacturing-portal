"use server";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/actions";
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from "@/lib/auth/session";
import { ErrorType, Errors, Routes } from "@/modules";

import type { ServerResult } from "@/modules";

export async function logout(): Promise<ServerResult> {
  try {
    const { session } = await getCurrentSession();
    if (session === null) throw Error(Errors.NOT_AUTHENTICATED);

    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ErrorType.ERROR };
  }

  redirect(Routes.LOGIN);
}
