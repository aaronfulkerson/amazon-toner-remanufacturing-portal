"use server";

import { redirect } from "next/navigation";
import { insertUser } from "@/db/queries";
import { USER_ROLE } from "@/db/schema";
import { handleError } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { ROUTES } from "@/modules";
import { SETUP_ERRORS, validate, verifyInitialSetup } from "@/modules/setup";

import type { InsertUser } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function createAdmin(
  prev: unknown,
  formData: FormData
): Promise<ServerResult | undefined> {
  try {
    const setupComplete = await verifyInitialSetup();
    if (setupComplete) throw Error(SETUP_ERRORS.SETUP_COMPLETE);

    const { email, name, password } = validate(formData);

    const passwordHash = await hashPassword(password);
    const user: InsertUser = {
      email,
      emailConfirmed: true,
      name,
      passwordHash,
      role: USER_ROLE.ADMIN,
    };
    await insertUser(user);
  } catch (e: unknown) {
    return handleError(e);
  }

  redirect(ROUTES.LOGIN);
}
