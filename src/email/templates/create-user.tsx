import type { InsertSecureToken, InsertUser } from "@/db/schema";

export const CREATE_USER_SUBJECT = "Confirm your account";

interface CreateUserProps
  extends Pick<InsertUser, "name">,
    Pick<InsertSecureToken, "token"> {}

export function CreateUserTemplate({ name, token }: CreateUserProps) {
  return <></>;
}
