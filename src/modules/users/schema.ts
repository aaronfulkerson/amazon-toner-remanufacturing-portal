import { z } from "zod/v4";
import { PERMISSION_NAME, USER_ROLE } from "@/db/schema";

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

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().nonempty(),
  // permissions: z.tuple([z.enum(permissionsEnum)], z.enum(permissionsEnum)),
  permissions: z.array(z.enum(permissionsEnum)).min(1),
  role: z.enum(roleEnum),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
