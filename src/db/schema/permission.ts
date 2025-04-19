import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";
import { userTable } from "@/db/schema";

export const Permission = {
  REMANUFACTURING: "remanufacturing",
  SERVICE: "service",
  TONER: "toner",
} as const;
export const permissionEnum = pgEnum("permission_enum", [
  Permission.REMANUFACTURING,
  Permission.SERVICE,
  Permission.TONER,
]);

export const permissionTable = pgTable("permission", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  permission: permissionEnum("permission").notNull(),
});
