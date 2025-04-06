import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

import { userTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

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

export type Session = InferSelectModel<typeof sessionTable>;
export type InsertSession = InferInsertModel<typeof sessionTable>;
export type UpdateSession = Partial<InsertSession>;
