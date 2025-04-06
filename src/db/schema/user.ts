import {
  pgEnum,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["admin", "employee"]);

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("passwordHash").notNull(),
    role: roleEnum("role").notNull().default("employee"),
  },
  (table) => [uniqueIndex("email").on(table.email)]
);

export type User = InferSelectModel<typeof userTable>;
export type UserWithoutPasswordHash = Omit<User, "passwordHash">;
export type InsertUser = InferInsertModel<typeof userTable>;
