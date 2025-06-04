import { difference } from "lodash";
import { z } from "zod/v4";
import { InsertPermission, PERMISSION_NAME, USER_ROLE } from "@/db/schema";
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

function permissionsAreValid(
  inputPermissions: InsertPermission["name"][],
  permissions: Readonly<InsertPermission["name"][]>
) {
  const invalidPermissions = difference(inputPermissions, permissions);
  return !invalidPermissions.length;
}

export const createUserSchema = z
  .object({
    email: z.email(),
    name: z.string().nonempty(),
    permissions: z.array(z.enum(permissionsEnum)).min(1),
    role: z.enum(roleEnum),
  })
  .refine(
    (data) =>
      permissionsAreValid(data.permissions, VALID_ROLE_PERMISSIONS[data.role]),
    {
      message: INVALID_PERMISSIONS,
      path: ["permissions"],
    }
  );

export const updateUserSchema = z
  .object({
    id: z.transform((id) => Number(id)),
    permissions: z.array(z.enum(permissionsEnum)).min(1),
    role: z.enum(roleEnum),
  })
  .refine(
    (data) =>
      permissionsAreValid(data.permissions, VALID_ROLE_PERMISSIONS[data.role]),
    {
      abort: true,
      message: INVALID_PERMISSIONS,
      path: ["permissions"],
    }
  );

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
