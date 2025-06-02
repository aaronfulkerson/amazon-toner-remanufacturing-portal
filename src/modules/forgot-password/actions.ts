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
import { createSecureToken } from "@/lib/auth/secure-tokens";
import { ROUTES } from "@/modules";
import { validate } from "@/modules/forgot-password";
import { handleError } from "@/lib";

import type { SelectUserOmitPasswordHash } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function forgotPassword(
  prev: unknown,
  formData: FormData
): Promise<ServerResult | undefined> {
  let user: SelectUserOmitPasswordHash | undefined;

  try {
    const data = validate(formData);

    user = await getUserByEmail(data.email);
  } catch (e: unknown) {
    return handleError(e);
  }

  if (!user) redirect(ROUTES.LOGIN);

  try {
    await deleteSecureTokenByUserId(user.id);

    const passwordResetToken = createSecureToken(
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
  } catch (e: unknown) {
    return handleError(e);
  }

  redirect(ROUTES.LOGIN);
}
