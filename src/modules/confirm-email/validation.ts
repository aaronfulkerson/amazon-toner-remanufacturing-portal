import { prettifyError } from "zod/v4";
import { confirmEmailSchema } from "@/modules/confirm-email";

export function validate(formData: FormData) {
  const unparsed = Object.fromEntries(formData.entries());
  const { data, error, success } = confirmEmailSchema.safeParse(unparsed);
  if (!success) throw Error(prettifyError(error));

  return data;
}
