import type { SelectSession, SelectUserOmitPasswordHash } from "@/db/schema";

export interface ValidSession {
  session: SelectSession;
  user: SelectUserOmitPasswordHash;
}

export type SessionValidationResult =
  | ValidSession
  | { session: null; user: null };
