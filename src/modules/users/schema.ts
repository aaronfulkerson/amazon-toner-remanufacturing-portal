import { difference } from "lodash";
import { z } from "zod/v4";
import { PERMISSION_NAME, USER_ROLE } from "@/db/schema";
import { VALID_ROLE_PERMISSIONS } from "@/modules";

const roleEnum = [
  USER_ROLE.CUSTOMER,
  USER_ROLE.EMPLOYEE,
  USER_ROLE.TECHNICIAN,
] as const;

const permissionsEnum = [
  PERMISSION_NAME.REMANUFACTURING,
  PERMISSION_NAME.SERVICE,
  PERMISSION_NAME.TONER,
] as const;

const INVALID_PERMISSIONS = "Invalid permissions for role.";

export const createUserSchema = z
  .object({
    email: z.email(),
    name: z.string().nonempty(),
    permissions: z.array(z.enum(permissionsEnum)).min(1),
    role: z.enum(roleEnum),
  })
  .refine(
    (data) => {
      const invalidPermissions = difference(
        data.permissions,
        VALID_ROLE_PERMISSIONS[data.role]
      );
      return !invalidPermissions.length;
    },
    {
      message: INVALID_PERMISSIONS,
      path: ["permissions"],
    }
  );

export const updateUserSchema = z
  .object({
    id: z.number().readonly(),
    permissions: z.array(z.enum(permissionsEnum)).min(1),
    role: z.enum(roleEnum).readonly(),
  })
  .refine(
    (data) => {
      const invalidPermissions = difference(
        data.permissions,
        VALID_ROLE_PERMISSIONS[data.role]
      );
      return !invalidPermissions.length;
    },
    {
      abort: true,
      message: INVALID_PERMISSIONS,
      path: ["permissions"],
    }
  );

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
