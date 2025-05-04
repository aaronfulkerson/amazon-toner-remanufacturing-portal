import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";
import { userTable } from "@/db/schema";

export const PERMISSION = {
  REMANUFACTURING: "remanufacturing",
  SERVICE: "service",
  TONER: "toner",
} as const;
export const permissionEnum = pgEnum("permission_enum", [
  PERMISSION.REMANUFACTURING,
  PERMISSION.SERVICE,
  PERMISSION.TONER,
]);

export const permissionTable = pgTable("permission", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  permission: permissionEnum("permission").notNull(),
});
