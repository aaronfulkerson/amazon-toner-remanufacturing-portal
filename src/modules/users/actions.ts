"use server";

import { getEmailTemplate, resend } from "@/email";
import { CREATE_USER_SUBJECT, CreateUserTemplate } from "@/email/templates";
import { handleError, RESULT_TYPE } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { insertUserWithPermissions, validate } from "@/modules/users";

import type { InsertUser } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function createUser(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const { email, name, permissions, role } = validate(formData);

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

    return { message: "User successfully created.", type: RESULT_TYPE.SUCCESS };
  } catch (e: unknown) {
    return handleError(e);
  }
}
