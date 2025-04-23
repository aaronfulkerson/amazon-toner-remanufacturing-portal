import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const UserRole = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
  TECHNICIAN: "technician",
} as const;
export const roleEnum = pgEnum("role", [
  UserRole.ADMIN,
  UserRole.CUSTOMER,
  UserRole.EMPLOYEE,
  UserRole.TECHNICIAN,
]);

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    active: boolean("active").notNull().default(true),
    email: text("email").notNull().unique(),
    passwordHash: text("passwordHash").notNull(),
    role: roleEnum("role").notNull(),
  },
  (table) => [uniqueIndex("email").on(table.email)]
);
