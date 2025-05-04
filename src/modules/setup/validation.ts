import {
  createAdminSchema,
  SETUP_ERRORS,
  verifyInitialSetup,
} from "@/modules/setup";

import type { CreateAdminSchema } from "@/modules/setup";

export async function validate(formData: FormData): Promise<CreateAdminSchema> {
  const setupComplete = await verifyInitialSetup();
  if (setupComplete) throw Error(SETUP_ERRORS.SETUP_COMPLETE);

  const unparsed = Object.fromEntries(formData);
  const { data, success } = createAdminSchema.safeParse(unparsed);
  if (!success) throw Error(SETUP_ERRORS.VALIDATION_FAILED);

  return data;
}
