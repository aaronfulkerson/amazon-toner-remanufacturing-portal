import { z } from "zod/v4";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
    token: z.string().nonempty(),
  })
  .refine((data) => data.password !== data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
