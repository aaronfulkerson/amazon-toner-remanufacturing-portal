import { getTableColumns } from "drizzle-orm";
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
  EMPLOYEE_DELEGATE: "employee_delegate",
  TECHNICIAN: "technician",
} as const;
export const userRoleEnum = pgEnum("user_role_enum", [
  USER_ROLE.ADMIN,
  USER_ROLE.CUSTOMER,
  USER_ROLE.EMPLOYEE,
  USER_ROLE.EMPLOYEE_DELEGATE,
  USER_ROLE.TECHNICIAN,
]);

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    active: boolean("active").notNull().default(true),
    email: text("email").notNull().unique(),
    emailConfirmed: boolean("email_confirmed").notNull().default(false),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").notNull(),
  },
  (table) => [uniqueIndex("email").on(table.email)]
);

const { passwordHash, ...userTableRest } = getTableColumns(userTable);
export { userTableRest as userTableNoPasswordHash };
