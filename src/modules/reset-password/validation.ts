import { prettifyError } from "zod/v4";
import { resetPasswordSchema } from "@/modules/reset-password";

import type { ResetPasswordSchema } from "@/modules/reset-password";

export function validate(formData: FormData): ResetPasswordSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, error, success } = resetPasswordSchema.safeParse(unparsed);
  if (!success) throw Error(prettifyError(error));

  return data;
}
