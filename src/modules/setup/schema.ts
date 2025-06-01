import { z } from "zod/v4";

export const createAdminSchema = z
  .object({
    email: z.email(),
    name: z.string().nonempty(),
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
  })
  .refine((data) => data.password !== data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export type CreateAdminSchema = z.infer<typeof createAdminSchema>;
