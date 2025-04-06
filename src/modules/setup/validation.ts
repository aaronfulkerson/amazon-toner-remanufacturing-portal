import { createAdminSchema, SETUP_ERRORS } from "@/modules/setup";

import type { CreateAdminSchema } from "@/modules/setup";

export function validate(formData: FormData): CreateAdminSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, success } = createAdminSchema.safeParse(unparsed);
  if (!success) throw Error(SETUP_ERRORS.VALIDATION_FAILED);

  return data;
}
