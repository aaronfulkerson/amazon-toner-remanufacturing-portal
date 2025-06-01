import { prettifyError } from "zod/v4";
import { forgotPasswordSchema } from "@/modules/forgot-password";

import type { ForgotPasswordSchema } from "@/modules/forgot-password";

export function validate(formData: FormData): ForgotPasswordSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, error, success } = forgotPasswordSchema.safeParse(unparsed);
  if (!success) throw Error(prettifyError(error));

  return data;
}
