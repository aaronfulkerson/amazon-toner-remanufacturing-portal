import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";
import { consumableTable } from "@/db/schema";

export const TONER_COLOR = {
  BLACK: "black",
  CYAN: "cyan",
  MAGENTA: "magenta",
  YELLOW: "yellow",
} as const;
export const tonerColorEnum = pgEnum("toner_color", [
  TONER_COLOR.BLACK,
  TONER_COLOR.CYAN,
  TONER_COLOR.MAGENTA,
  TONER_COLOR.YELLOW,
]);

export const TONER_YIELD = {
  HIGH: "high",
  NORMAL: "normal",
} as const;
export const tonerYieldEnum = pgEnum("toner_yield", [
  TONER_YIELD.HIGH,
  TONER_YIELD.NORMAL,
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
