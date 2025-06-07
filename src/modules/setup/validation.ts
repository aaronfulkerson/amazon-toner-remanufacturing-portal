import { prettifyError } from "zod/v4";
import { createAdminSchema, createDelegateSchema } from "@/modules/setup";

import type { CreateAdminSchema, CreateDelegateSchema } from "@/modules/setup";

export function validateCreateAdmin(formData: FormData): CreateAdminSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, error, success } = createAdminSchema.safeParse(unparsed);
  if (!success) throw Error(prettifyError(error));

  return data;
}

export function validateCreateDelegate(
  formData: FormData
): CreateDelegateSchema {
  const unparsed = Object.fromEntries(formData);
  const { data, error, success } = createDelegateSchema.safeParse(unparsed);
  if (!success) throw Error(prettifyError(error));

  return data;
}
