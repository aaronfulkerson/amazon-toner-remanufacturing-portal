import { FORM_ERRORS } from "@/modules";
import { resetPasswordSchema } from "@/modules/reset-password";

import type { ResetPasswordSchema } from "@/modules/reset-password";

export function validate(formData: FormData): ResetPasswordSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, success } = resetPasswordSchema.safeParse(unparsed);
  if (!success) throw Error(FORM_ERRORS.VALIDATION_FAILED);

  return data;
}
