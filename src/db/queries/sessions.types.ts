import type { Session, UserWithoutPasswordHash } from "@/db/schema";

export type ValidSession = {
  session: Session;
  user: UserWithoutPasswordHash;
};

export type SessionValidationResult =
  | ValidSession
  | { session: null; user: null };
