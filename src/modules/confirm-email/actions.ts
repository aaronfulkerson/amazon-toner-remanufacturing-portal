"use server";

import { redirect } from "next/navigation";
import {
  deleteSecureTokenById,
  getSecureToken,
  updateUser,
} from "@/db/queries";
import { SECURE_TOKEN_TYPE } from "@/db/schema";
import { RESULT_TYPE } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { ROUTES, SECURE_TOKEN_ERRORS } from "@/modules";
import { validate } from "@/modules/confirm-email";

import type { ServerResult } from "@/lib";

export async function confirmEmail(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const { password, token } = validate(formData);

    const emailConfirmationToken = await getSecureToken(
      token,
      SECURE_TOKEN_TYPE.EMAIL_CONFIRMATION
    );
    if (!emailConfirmationToken)
      throw Error(SECURE_TOKEN_ERRORS.TOKEN_NOT_FOUND);

    if (Date.now() > emailConfirmationToken.expiresAt.getTime()) {
      await deleteSecureTokenById(emailConfirmationToken.id);
      throw Error(SECURE_TOKEN_ERRORS.TOKEN_EXPIRED);
    }

    const passwordHash = await hashPassword(password);
    await updateUser(emailConfirmationToken.userId, {
      emailConfirmed: true,
      passwordHash,
    });
    await deleteSecureTokenById(emailConfirmationToken.id);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: RESULT_TYPE.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
