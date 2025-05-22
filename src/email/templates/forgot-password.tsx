import type { InsertSecureToken, InsertUser } from "@/db/schema";

export const FORGOT_PASSWORD_SUBJECT = "Forgotten password";

interface ForgotPasswordProps
  extends Pick<InsertUser, "name">,
    Pick<InsertSecureToken, "token"> {}

export function ForgotPasswordTemplate({ name, token }: ForgotPasswordProps) {
  return <></>;
}
