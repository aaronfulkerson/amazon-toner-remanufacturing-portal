import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";
import { consumableTable } from "@/db/schema";

export const TonerColor = {
  BLACK: "black",
  CYAN: "cyan",
  MAGENTA: "magenta",
  YELLOW: "yellow",
} as const;
export const tonerColorEnum = pgEnum("toner_color", [
  TonerColor.BLACK,
  TonerColor.CYAN,
  TonerColor.MAGENTA,
  TonerColor.YELLOW,
]);

export const TonerYield = {
  HIGH: "high",
  NORMAL: "normal",
} as const;
export const tonerYieldEnum = pgEnum("toner_yield", [
  TonerYield.HIGH,
  TonerYield.NORMAL,
]);

export const tonerTable = pgTable("toner", {
  id: serial("id").primaryKey(),
  consumableId: integer("consumable_id")
    .notNull()
    .references(() => consumableTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  color: tonerColorEnum("color").notNull(),
  yield: tonerYieldEnum("yield").notNull(),
});
