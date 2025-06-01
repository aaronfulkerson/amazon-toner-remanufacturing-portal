import { z } from "zod/v4";
import { PASSWORD_VALIDATION_ERROR } from "@/lib";

export const createAdminSchema = z
  .object({
    email: z.email(),
    name: z.string().nonempty(),
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
  })
  .refine((data) => data.password !== data.passwordConfirmation, {
    message: PASSWORD_VALIDATION_ERROR.INVALID_CONFIRMATION,
    path: ["passwordConfirmation"],
  });

export type CreateAdminSchema = z.infer<typeof createAdminSchema>;
