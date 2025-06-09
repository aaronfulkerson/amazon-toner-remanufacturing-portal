"use server";

import { getEmailTemplate, resend } from "@/email";
import { CREATE_USER_SUBJECT, CreateUserTemplate } from "@/email/templates";
import {
  AUTHORIZATION_ERRORS,
  createServerResult,
  handleError,
  RESULT_TYPE,
} from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { requireAuthorizedSession } from "@/lib/auth/session.cached";
import { PERMISSIONS } from "@/modules";
import {
  insertUserWithPermissions,
  updateUserWithPermissions,
  validateCreateUser,
  validateUpdateUser,
} from "@/modules/users";

import type { InsertUser } from "@/db/schema";
import type { ServerResult } from "@/lib";

const USER_ACTION_RESULT = {
  CREATE_SUCCESS: "User successfully created.",
  UPDATE_SUCCESS: "User successfully updated.",
};

export async function createUser(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  const isAuthorized = await requireAuthorizedSession(PERMISSIONS.USERS);
  if (!isAuthorized) {
    return createServerResult(
      AUTHORIZATION_ERRORS.NOT_AUTHORIZED,
      RESULT_TYPE.ERROR
    );
  }

  try {
    const { email, name, permissions, role } =
      await validateCreateUser(formData);

    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    const passwordHash = await hashPassword(bytes.toString());
    const user: InsertUser = {
      email,
      name,
      passwordHash,
      role,
    };
    const token = await insertUserWithPermissions(user, permissions);

    await resend.emails.send({
      from: process.env.SUPPORT_EMAIL!,
      to: email,
      subject: CREATE_USER_SUBJECT,
      react: getEmailTemplate(CreateUserTemplate, { name, token }),
    });

    return createServerResult(
      USER_ACTION_RESULT.CREATE_SUCCESS,
      RESULT_TYPE.SUCCESS
    );
  } catch (e: unknown) {
    return handleError(e);
  }
}

export async function updateUser(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  const isAuthorized = await requireAuthorizedSession(PERMISSIONS.USERS);
  if (!isAuthorized) {
    return createServerResult(
      AUTHORIZATION_ERRORS.NOT_AUTHORIZED,
      RESULT_TYPE.ERROR
    );
  }

  try {
    const { permissions, ...user } = await validateUpdateUser(formData);

    await updateUserWithPermissions(user.id, permissions);

    return createServerResult(
      USER_ACTION_RESULT.UPDATE_SUCCESS,
      RESULT_TYPE.SUCCESS
    );
  } catch (e: unknown) {
    return handleError(e);
  }
}
