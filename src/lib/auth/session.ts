import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { cookies } from "next/headers";
import {
  deleteSessionById,
  deleteSessionsByUserId,
  getSessionById,
  insertSession,
  updateSession,
} from "@/db/queries";

import type { SessionValidationResult } from "@/db/queries";
import type { InsertSession, SelectSession } from "@/db/schema";

export const SESSION_COOKIE_NAME = "session";

function encodeSessionId(token: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}

function daysFromToday(days: number): Date {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number
): Promise<SelectSession> {
  const sessionId = encodeSessionId(token);
  const session: InsertSession = {
    expiresAt: daysFromToday(30),
    id: sessionId,
    userId,
  };
  await insertSession(session);
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeSessionId(token);
  const result = await getSessionById(sessionId);
  if (!result) return { permissions: null, session: null, user: null };

  const { session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await deleteSessionById(session.id);
    return { permissions: null, session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = daysFromToday(30);
    await updateSession(session.id, { expiresAt: session.expiresAt });
  }

  return result;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await deleteSessionById(sessionId);
}

export async function invalidateAllSessions(userId: number): Promise<void> {
  await deleteSessionsByUserId(userId);
}

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
