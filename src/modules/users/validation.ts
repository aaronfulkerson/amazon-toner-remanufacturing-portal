import { prettifyError } from "zod/v4";
import {
  createUserSchema,
  emailIsAvailable,
  updateUserSchema,
  userHasRole,
} from "@/modules/users";

import type { CreateUserSchema, UpdateUserSchema } from "@/modules/users";

export async function validateCreateUser(
  formData: FormData
): Promise<CreateUserSchema> {
  const unparsed = Object.fromEntries(formData.entries());
  const { data, error, success } = await createUserSchema
    .refine(async (data) => await emailIsAvailable(data.email), {
      message: "An account with that email already exists.",
      path: ["email"],
    })
    .safeParseAsync({
      ...unparsed,
      permissions: formData.getAll("permissions"),
    });
  if (!success) throw Error(prettifyError(error));

  return data;
}

export async function validateUpdateUser(
  formData: FormData
): Promise<UpdateUserSchema> {
  const unparsed = Object.fromEntries(formData.entries());
  const { data, error, success } = await updateUserSchema
    .refine(async (data) => await userHasRole(data.id, data.role), {
      message: "A user's role cannot be modified.",
      path: ["role"],
    })
    .safeParseAsync({
      ...unparsed,
      permissions: formData.getAll("permissions"),
    });
  if (!success) throw Error(prettifyError(error));

  return data;
}
