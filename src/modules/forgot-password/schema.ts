import { z } from "zod/v4";

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
