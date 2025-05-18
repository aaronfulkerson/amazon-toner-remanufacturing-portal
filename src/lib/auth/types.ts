import type {
  SelectPermission,
  SelectSession,
  SelectUser,
  SelectUserOmitPasswordHash,
} from "@/db/schema";
import type { UserPermissions } from "@/modules/users";

export interface ValidSession {
  permissions: UserPermissions;
  session: SelectSession;
  user: SelectUserOmitPasswordHash;
}
export type SessionValidationResult =
  | ValidSession
  | { permissions: null; session: null; user: null };

export type AllowedRoles = {
  [k in SelectUser["role"]]: boolean | SelectPermission["name"][];
};
