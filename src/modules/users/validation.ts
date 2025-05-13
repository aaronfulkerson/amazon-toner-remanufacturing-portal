import { FORM_ERRORS } from "@/modules";
import { createUserSchema } from "@/modules/users";

import type { CreateUserSchema } from "@/modules/users";

export async function validate(formData: FormData): Promise<CreateUserSchema> {
  const unparsed = Object.fromEntries(formData);
  const { data, success } = createUserSchema.safeParse(unparsed);
  if (!success) throw Error(FORM_ERRORS.VALIDATION_FAILED);

  return data;
}
