import { FORM_ERRORS } from "@/modules";
import { confirmEmailSchema } from "@/modules/confirm-email";

export function validate(formData: FormData) {
  const unparsed = Object.fromEntries(formData.entries());
  const { data, success } = confirmEmailSchema.safeParse(unparsed);
  if (!success) throw Error(FORM_ERRORS.VALIDATION_FAILED);

  return data;
}
