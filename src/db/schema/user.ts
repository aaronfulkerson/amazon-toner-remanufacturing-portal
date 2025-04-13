import {
  pgEnum,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const UserRole = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
} as const;
export const roleEnum = pgEnum("role", [UserRole.ADMIN, UserRole.EMPLOYEE]);

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("passwordHash").notNull(),
    role: roleEnum("role").notNull().default(UserRole.EMPLOYEE),
  },
  (table) => [uniqueIndex("email").on(table.email)]
);
