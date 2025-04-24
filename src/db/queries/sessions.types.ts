import type {
  SelectPermission,
  SelectSession,
  SelectUserOmitPasswordHash,
} from "@/db/schema";

export type Permissions = (SelectPermission["permission"] | null)[];
export interface ValidSession {
  permissions: Permissions;
  session: SelectSession;
  user: SelectUserOmitPasswordHash;
}
export type SessionValidationResult =
  | ValidSession
  | { permissions: null; session: null; user: null };
