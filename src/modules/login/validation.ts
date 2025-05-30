"use server";

import { verifyPasswordHash } from "@/lib/auth/password";
import { FORM_ERRORS } from "@/modules";
import { getUserForLogin, LOGIN_ERRORS, loginSchema } from "@/modules/login";

import type { SelectUser } from "@/db/schema";

export async function validate(formData: FormData): Promise<SelectUser> {
  const unparsed = Object.fromEntries(formData);
  const result = loginSchema.safeParse(unparsed);
  if (!result.success) throw Error(FORM_ERRORS.VALIDATION_FAILED);

  const { data } = result;

  const user = await getUserForLogin(data.email);
  if (!user) throw Error(LOGIN_ERRORS.INVALID_CREDENTIALS);

  const authenticated = await verifyPasswordHash(
    user.passwordHash,
    data.password
  );
  if (!authenticated) throw Error(LOGIN_ERRORS.INVALID_CREDENTIALS);

  return user;
}
