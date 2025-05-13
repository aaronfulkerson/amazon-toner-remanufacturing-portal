"use server";

import { redirect } from "next/navigation";
import { insertUser } from "@/db/queries";
import { ERROR_TYPE } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { ROUTES } from "@/modules";
import { validate } from "@/modules/users";

import type { InsertUser } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function createUser(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const { email, name, role } = await validate(formData);

    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    const passwordHash = await hashPassword(bytes.toString());
    const user: InsertUser = {
      email,
      name,
      passwordHash,
      role,
    };
    await insertUser(user);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ERROR_TYPE.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
