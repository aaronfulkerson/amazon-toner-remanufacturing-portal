import { createAdminSchema, SetupErrors } from "@/modules/setup";

import type { CreateAdminSchema } from "@/modules/setup";

export function validate(formData: FormData): CreateAdminSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, success } = createAdminSchema.safeParse(unparsed);
  if (!success) throw Error(SetupErrors.VALIDATION_FAILED);

  return data;
}
