import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { userTable } from "@/db/schema";

export const SECURE_TOKEN_TYPE = {
  EMAIL_CONFIRMATION: "email_confirmation",
  PASSWORD_RESET: "password_reset",
} as const;
export const secureTokenTypeEnum = pgEnum("secure_token_type_enum", [
  SECURE_TOKEN_TYPE.EMAIL_CONFIRMATION,
  SECURE_TOKEN_TYPE.PASSWORD_RESET,
]);

export const secureTokenTable = pgTable("secure_token", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  token: text("token").notNull(),
  type: secureTokenTypeEnum("type").notNull(),
});
