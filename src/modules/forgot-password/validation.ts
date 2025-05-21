import { FORM_ERRORS } from "@/modules";
import { forgotPasswordSchema } from "@/modules/forgot-password";

import type { ForgotPasswordSchema } from "@/modules/forgot-password";

export function validate(formData: FormData): ForgotPasswordSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, success } = forgotPasswordSchema.safeParse(unparsed);
  if (!success) throw Error(FORM_ERRORS.VALIDATION_FAILED);

  return data;
}
