import { z } from "zod";
import { PERMISSION, USER_ROLE } from "@/db/schema";

import { SelectPermission, SelectUser } from "@/db/schema";

const roleEnum: [SelectUser["role"], ...SelectUser["role"][]] = [
  USER_ROLE.CUSTOMER,
  USER_ROLE.EMPLOYEE,
  USER_ROLE.TECHNICIAN,
] as const;

const permissionsEnum: [
  SelectPermission["permission"],
  ...SelectPermission["permission"][]
] = [PERMISSION.REMANUFACTURING, PERMISSION.SERVICE, PERMISSION.TONER] as const;

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
  permissions: z.array(z.enum(permissionsEnum)),
  role: z.enum(roleEnum),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
