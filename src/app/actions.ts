"use server";

import { redirect } from "next/navigation";

import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/server/session";

export async function logoutAction(): Promise<ActionResult> {
  const { session } = await getCurrentSession();

  if (session === null) {
    return {
      message: "Not authenticated",
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  return redirect("/login");
}

interface ActionResult {
  message: string;
}
