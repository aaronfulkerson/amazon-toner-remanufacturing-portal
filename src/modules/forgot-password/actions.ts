"use server";

import { redirect } from "next/navigation";
import { ROUTES } from "@/modules";
import { validate } from "@/modules/forgot-password";
import {
  deleteSecureTokenByUserId,
  getUserByEmail,
  insertSecureToken,
} from "@/db/queries";
import { SECURE_TOKEN_TYPE } from "@/db/schema";

import type { InsertSecureToken } from "@/db/schema";

export async function forgotPassword(prev: unknown, formData: FormData) {
  const { email } = validate(formData);

  const user = await getUserByEmail(email);
  if (!user) redirect(ROUTES.LOGIN);

  await deleteSecureTokenByUserId(user.id);

  const token = crypto.randomUUID();
  const secureToken: InsertSecureToken = {
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    token,
    type: SECURE_TOKEN_TYPE.PASSWORD_RESET,
    userId: user.id,
  };
  await insertSecureToken(secureToken);

  console.log("SEND EMAIL");

  redirect(ROUTES.LOGIN);
}
