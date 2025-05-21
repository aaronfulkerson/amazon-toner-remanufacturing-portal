"use server";

import { redirect } from "next/navigation";
import {
  deleteSecureTokenByUserId,
  getUserByEmail,
  insertSecureToken,
} from "@/db/queries";
import { SECURE_TOKEN_TYPE } from "@/db/schema";
import { getEmailTemplate, resend } from "@/email";
import {
  FORGOT_PASSWORD_SUBJECT,
  ForgotPasswordTemplate,
} from "@/email/templates";
import { generateSecureToken } from "@/lib/auth/secure-tokens";
import { ROUTES } from "@/modules";
import { validate } from "@/modules/forgot-password";
import { RESULT_TYPE } from "@/lib";

import type { InsertUser, SelectUserOmitPasswordHash } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function forgotPassword(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  var user: SelectUserOmitPasswordHash | undefined;
  var email: InsertUser["email"];

  try {
    const validated = validate(formData);
    email = validated.email;

    user = await getUserByEmail(email);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: RESULT_TYPE.ERROR };
  }

  if (!user) redirect(ROUTES.LOGIN);

  try {
    await deleteSecureTokenByUserId(user.id);

    const passwordResetToken = generateSecureToken(
      SECURE_TOKEN_TYPE.PASSWORD_RESET,
      user.id
    );
    await insertSecureToken(passwordResetToken);

    await resend.emails.send({
      from: process.env.SUPPORT_EMAIL!,
      to: user.email,
      subject: FORGOT_PASSWORD_SUBJECT,
      react: getEmailTemplate(ForgotPasswordTemplate, {
        name: user.name,
        token: passwordResetToken.token,
      }),
    });
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: RESULT_TYPE.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
