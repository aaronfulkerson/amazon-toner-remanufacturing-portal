import type {
  SelectPermission,
  SelectSession,
  SelectUserOmitPasswordHash,
} from "@/db/schema";

export interface ValidSession {
  permissions: SelectPermission["permission"][];
  session: SelectSession;
  user: SelectUserOmitPasswordHash;
}
export type SessionValidationResult =
  | ValidSession
  | { permissions: null; session: null; user: null };
