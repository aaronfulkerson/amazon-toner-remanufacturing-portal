import { prettifyError } from "zod/v4";
import { createAdminSchema } from "@/modules/setup";

import type { CreateAdminSchema } from "@/modules/setup";

export function validate(formData: FormData): CreateAdminSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, error, success } = createAdminSchema.safeParse(unparsed);
  if (!success) throw Error(prettifyError(error));

  return data;
}
