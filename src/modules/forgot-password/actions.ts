"use server";

import { redirect } from "next/navigation";
import { RESULT_TYPE } from "@/lib";
import { ROUTES } from "@/modules";
import { validate } from "@/modules/forgot-password";

export async function forgotPassword(prev: unknown, formData: FormData) {
  try {
    const { email } = validate(formData);
    console.log(email);
  } catch (e) {
    if (e instanceof Error)
      return { message: e.message, type: RESULT_TYPE.ERROR };
  }

  redirect(ROUTES.LOGIN);
}
