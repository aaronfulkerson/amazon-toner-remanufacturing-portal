"use server";

import { redirect } from "next/navigation";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/auth/session";

export async function logout(): Promise<ActionResult> {
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

type ActionResult =
  | {
      message: string;
    }
  | never;
