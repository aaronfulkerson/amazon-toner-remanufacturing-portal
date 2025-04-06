"use server";

import { getUserByEmail } from "@/db/queries/users";
import { verifyPasswordHash } from "@/lib/auth/password";
import { LOGIN_ERRORS, loginSchema } from "@/modules/login";

export async function validate(formData: FormData) {
  const unparsed = Object.fromEntries(formData);
  const result = loginSchema.safeParse(unparsed);
  if (!result.success) throw Error(LOGIN_ERRORS.VALIDATION_FAILED);

  const { data } = result;

  const user = await getUserByEmail(data.email);
  if (!user) throw Error(LOGIN_ERRORS.INVALID_CREDENTIALS);

  const authenticated = await verifyPasswordHash(
    user.passwordHash,
    data.password
  );
  if (!authenticated) throw Error(LOGIN_ERRORS.INVALID_CREDENTIALS);

  return user;
}
