import { createAdminSchema, SETUP_ERRORS } from "@/modules/setup";

import type { CreateAdminSchema } from "@/modules/setup";

export function validate(formData: FormData): CreateAdminSchema {
  const unparsed = Object.fromEntries(formData);
  const result = createAdminSchema.safeParse(unparsed);
  if (!result.success) throw Error(SETUP_ERRORS.VALIDATION_FAILED);

  return result.data;
}
