import type {
  PERMISSION,
  SelectPermission,
  SelectSession,
  SelectUserOmitPasswordHash,
  USER_ROLE,
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

type UserRoleObj = typeof USER_ROLE;
type UserRoleValues = UserRoleObj[keyof UserRoleObj];
type PermissionObj = typeof PERMISSION;
type PermissionValues = PermissionObj[keyof PermissionObj][];
export type AllowedRoles = {
  [k in UserRoleValues]: boolean | PermissionValues;
};
