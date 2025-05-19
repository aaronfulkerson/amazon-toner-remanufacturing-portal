import { FORM_ERRORS } from "@/modules";
import { createUserSchema } from "@/modules/users";

import type { CreateUserSchema } from "@/modules/users";

export function validate(formData: FormData): CreateUserSchema {
  const unparsed = Object.fromEntries(formData.entries());
  const { data, success } = createUserSchema.safeParse({
    ...unparsed,
    permissions: formData.getAll("permissions"),
  });
  if (!success) throw Error(FORM_ERRORS.VALIDATION_FAILED);

  return data;
}
