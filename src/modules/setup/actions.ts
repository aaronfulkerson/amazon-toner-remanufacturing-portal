"use server";

import { redirect } from "next/navigation";
import { insertUser } from "@/db/queries";
import { USER_ROLE } from "@/db/schema";
import { RESULT_TYPE } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { ROUTES } from "@/modules";
import { validate } from "@/modules/setup";

import type { InsertUser } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function createAdmin(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const { email, name, password } = await validate(formData);

    const passwordHash = await hashPassword(password);
    const user: InsertUser = {
      email,
      emailConfirmed: true,
      name,
      passwordHash,
      role: USER_ROLE.ADMIN,
    };
    await insertUser(user);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: RESULT_TYPE.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
