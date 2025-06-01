import { prettifyError } from "zod/v4";
import {
  createUserSchema,
  emailIsAvailable,
  updateUserSchema,
  userHasRole,
} from "@/modules/users";

import type { CreateUserSchema, UpdateUserSchema } from "@/modules/users";

const USER_VALIDATION_ERROR = {
  PREEXISTING_EMAIL: "An account with that email already exists.",
  CANNOT_MODIFY_ROLE: "A user's role cannot be modified.",
};

export async function validateCreateUser(
  formData: FormData
): Promise<CreateUserSchema> {
  const unparsed = Object.fromEntries(formData.entries());
  const { data, error, success } = await createUserSchema
    .refine(async (data) => await emailIsAvailable(data.email), {
      message: USER_VALIDATION_ERROR.PREEXISTING_EMAIL,
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
      message: USER_VALIDATION_ERROR.CANNOT_MODIFY_ROLE,
      path: ["role"],
    })
    .safeParseAsync({
      ...unparsed,
      permissions: formData.getAll("permissions"),
    });
  if (!success) throw Error(prettifyError(error));

  return data;
}
