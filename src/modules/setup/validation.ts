import { createAdminSchema, SETUP_ERRORS } from "@/modules/setup";

export async function validate(formData: FormData) {
  const unparsed = Object.fromEntries(formData);
  const result = createAdminSchema.safeParse(unparsed);
  if (!result.success) throw Error(SETUP_ERRORS.VALIDATION_FAILED);

  return result.data;
}
