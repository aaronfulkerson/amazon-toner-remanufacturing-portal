"use server";

import { redirect } from "next/navigation";
import { createUser } from "@/db/queries/users";
import { hashPassword } from "@/lib/auth/password";
import { ERROR_TYPES, ROUTES } from "@/modules";
import { validate } from "@/modules/setup";

import type { UserInsert } from "@/db/schema";

export async function createAdmin(prev: unknown, formData: FormData) {
  try {
    const { email, password } = await validate(formData);

    const passwordHash = await hashPassword(password);
    const user: UserInsert = {
      email,
      passwordHash,
      role: "admin",
    };
    await createUser(user);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ERROR_TYPES.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
