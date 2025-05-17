"use server";

import { RESULT_TYPE } from "@/lib";
import { hashPassword } from "@/lib/auth/password";
import { insertUserWithPermissions, validate } from "@/modules/users";

import type { InsertUser } from "@/db/schema";
import type { ServerResult } from "@/lib";

export async function createUser(
  prev: unknown,
  formData: FormData
): Promise<ServerResult> {
  try {
    const { email, name, permissions, role } = await validate(formData);

    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    const passwordHash = await hashPassword(bytes.toString());
    const user: InsertUser = {
      email,
      name,
      passwordHash,
      role,
    };
    await insertUserWithPermissions(user, permissions);

    return { message: "User successfully created.", type: RESULT_TYPE.SUCCESS };
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: RESULT_TYPE.ERROR };
  }
}
