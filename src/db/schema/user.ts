import { pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("passwordHash").notNull(),
  },
  (table) => [uniqueIndex("email").on(table.email)]
);

export type User = InferSelectModel<typeof userTable>;
