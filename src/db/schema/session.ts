import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "@/db/schema";

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
