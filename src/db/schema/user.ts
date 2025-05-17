import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const USER_ROLE = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
  TECHNICIAN: "technician",
} as const;
export const roleEnum = pgEnum("role", [
  USER_ROLE.ADMIN,
  USER_ROLE.CUSTOMER,
  USER_ROLE.EMPLOYEE,
  USER_ROLE.TECHNICIAN,
]);

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    active: boolean("active").notNull().default(false),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    passwordReset: boolean("password_reset").notNull().default(false),
    role: roleEnum("role").notNull(),
  },
  (table) => [uniqueIndex("email").on(table.email)]
);
