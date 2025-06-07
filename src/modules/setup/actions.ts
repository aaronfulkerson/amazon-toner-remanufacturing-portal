"use server";

import { redirect } from "next/navigation";
import { insertUser } from "@/db/queries";
import { USER_ROLE } from "@/db/schema";
import { handleError } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { ROUTES } from "@/modules";
import {
  checkInitialUserRoles,
  SETUP_ERRORS,
  validateCreateAdmin,
  validateCreateDelegate,
} from "@/modules/setup";

import type { InsertUser } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function createAdmin(
  prev: unknown,
  formData: FormData
): Promise<ServerResult | undefined> {
  try {
    const { hasAdmin } = await checkInitialUserRoles();
    if (hasAdmin) throw Error(SETUP_ERRORS.HAS_ADMIN);

    const { email, name, password } = validateCreateAdmin(formData);

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

export async function createDelegate(
  prev: unknown,
  formData: FormData
): Promise<ServerResult | undefined> {
  try {
    const { hasDelegate } = await checkInitialUserRoles();
    if (hasDelegate) throw Error(SETUP_ERRORS.SETUP_COMPLETE);

    const { email, password } = validateCreateDelegate(formData);

    const passwordHash = await hashPassword(password);
    const user: InsertUser = {
      email,
      emailConfirmed: true,
      name: "Employee Delegate",
      passwordHash,
      role: USER_ROLE.EMPLOYEE_DELEGATE,
    };
    await insertUser(user);
  } catch (e: unknown) {
    return handleError(e);
  }

  redirect(ROUTES.LOGIN);
}
