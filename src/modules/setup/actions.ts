"use server";

import { redirect } from "next/navigation";
import { insertUser } from "@/db/queries";
import { hashPassword } from "@/lib/auth/password";
import { ActionResult, ERROR_TYPES, ROUTES } from "@/modules";
import { validate } from "@/modules/setup";

import type { InsertUser } from "@/db/schema";

export async function createAdmin(
  prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const { email, password } = validate(formData);

    const passwordHash = await hashPassword(password);
    const user: InsertUser = {
      email,
      passwordHash,
      role: "admin",
    };
    await insertUser(user);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: ERROR_TYPES.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
