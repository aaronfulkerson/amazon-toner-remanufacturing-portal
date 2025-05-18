import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
    token: z.string().nonempty(),
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
