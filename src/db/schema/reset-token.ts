import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const resetTokenTable = pgTable("reset_token", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).default(new Date(Date.now() + 1000 * 60 * 60 * 24)),
  token: text("token").notNull(),
});
