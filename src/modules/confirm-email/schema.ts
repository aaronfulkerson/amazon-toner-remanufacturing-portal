import { z } from "zod/v4";
import { PASSWORD_VALIDATION_ERROR } from "@/lib";

export const confirmEmailSchema = z
  .object({
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
    token: z.string().nonempty(),
  })
  .refine((data) => data.password !== data.passwordConfirmation, {
    message: PASSWORD_VALIDATION_ERROR.INVALID_CONFIRMATION,
    path: ["passwordConfirmation"],
  });

export type ConfirmEmailSchema = z.infer<typeof confirmEmailSchema>;
