"use server";

import { redirect } from "next/navigation";
import {
  deleteSecureTokenById,
  getSecureToken,
  updateUser,
} from "@/db/queries";
import { SECURE_TOKEN_TYPE } from "@/db/schema";
import { handleError } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { ROUTES, SECURE_TOKEN_ERRORS } from "@/modules";
import { validate } from "@/modules/reset-password";

import type { UpdateUser } from "@/db/schema";

export async function resetPassword(prev: unknown, formData: FormData) {
  try {
    const { password, token } = validate(formData);

    const passwordResetToken = await getSecureToken(
      token,
      SECURE_TOKEN_TYPE.PASSWORD_RESET
    );
    if (!passwordResetToken) throw Error(SECURE_TOKEN_ERRORS.TOKEN_NOT_FOUND);

    if (Date.now() > passwordResetToken.expiresAt.getTime()) {
      await deleteSecureTokenById(passwordResetToken.id);
      throw Error(SECURE_TOKEN_ERRORS.TOKEN_EXPIRED);
    }

    const user: UpdateUser = {
      passwordHash: await hashPassword(password),
    };
    await updateUser(passwordResetToken.userId, user);
    await deleteSecureTokenById(passwordResetToken.id);
  } catch (e: unknown) {
    return handleError(e);
  }

  redirect(ROUTES.LOGIN);
}
