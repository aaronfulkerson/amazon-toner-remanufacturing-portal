import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";
import { userTable } from "@/db/schema";

export const PERMISSION_NAME = {
  REMANUFACTURING: "remanufacturing",
  SERVICE: "service",
  TONER: "toner",
} as const;
export const permissionNameEnum = pgEnum("permission_name_enum", [
  PERMISSION_NAME.REMANUFACTURING,
  PERMISSION_NAME.SERVICE,
  PERMISSION_NAME.TONER,
]);

export const permissionTable = pgTable("permission", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  name: permissionNameEnum("name").notNull(),
});
