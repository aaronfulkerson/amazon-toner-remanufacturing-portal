import { z } from "zod";

export const createAdminSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
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

export type CreateAdminSchema = z.infer<typeof createAdminSchema>;
