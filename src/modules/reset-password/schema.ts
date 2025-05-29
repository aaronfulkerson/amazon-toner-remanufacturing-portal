import { z } from "zod/v4";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
    token: z.string().nonempty(),
  })
  .check((ctx) => {
    if (ctx.value.password !== ctx.value.passwordConfirmation) {
      ctx.issues.push({
        code: "custom",
        input: ctx.value.passwordConfirmation,
        message: "Passwords do not match",
      });
    }
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
