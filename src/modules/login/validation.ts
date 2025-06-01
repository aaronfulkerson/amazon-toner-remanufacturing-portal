import { prettifyError } from "zod/v4";
import { loginSchema } from "@/modules/login";

import { LoginSchema } from "@/modules/login";

export function validate(formData: FormData): LoginSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, error, success } = loginSchema.safeParse(unparsed);
  if (!success) throw Error(prettifyError(error));

  return data;
}
