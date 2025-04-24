import { verifyInitialSetup } from "@/db/queries";
import { createAdminSchema, SetupErrors } from "@/modules/setup";

import type { CreateAdminSchema } from "@/modules/setup";

export async function validate(formData: FormData): Promise<CreateAdminSchema> {
  const setupComplete = await verifyInitialSetup();
  if (setupComplete) throw Error(SetupErrors.SETUP_COMPLETE);

  const unparsed = Object.fromEntries(formData);
  const { data, success } = createAdminSchema.safeParse(unparsed);
  if (!success) throw Error(SetupErrors.VALIDATION_FAILED);

  return data;
}
