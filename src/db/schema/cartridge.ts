// import { sql } from "drizzle-orm";
import {
  // check,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { manufacturerTable } from "@/db/schema";

export const CartridgeColor = {
  BLACK: "black",
  CYAN: "cyan",
  MAGENTA: "magenta",
  YELLOW: "yellow",
} as const;
export const cartridgeColorEnum = pgEnum("cartridge_color", [
  CartridgeColor.BLACK,
  CartridgeColor.CYAN,
  CartridgeColor.MAGENTA,
  CartridgeColor.YELLOW,
]);

export const CartridgeType = {
  DRUM: "drum",
  TONER: "toner",
} as const;
export const cartridgeTypeEnum = pgEnum("cartridge_type", [
  CartridgeType.DRUM,
  CartridgeType.TONER,
]);

export const CartridgeYield = {
  HIGH: "high",
  NORMAL: "normal",
} as const;
export const cartridgeYieldEnum = pgEnum("cartridge_yield", [
  CartridgeYield.HIGH,
  CartridgeYield.NORMAL,
]);

export const cartridgeTable = pgTable(
  "cartridge",
  {
    id: serial("id").primaryKey(),
    manufacturerId: integer("manufacturer_id").references(
      () => manufacturerTable.id
    ),
    color: cartridgeColorEnum("color"),
    model: text("model").notNull(),
    type: cartridgeTypeEnum("type").notNull(),
    yield: cartridgeYieldEnum("yield"),
  }
  // https://github.com/drizzle-team/drizzle-orm/issues/3713
  // https://github.com/drizzle-team/drizzle-orm/pull/4043
  //
  // (table) => [
  //   check(
  //     "cartridge_type_check",
  //     sql`
  //       (${table.type} = '${CartridgeType.DRUM}' AND ${table.color} IS NULL AND ${table.yield} IS NULL)
  //       OR
  //       (${table.type} = '${CartridgeType.TONER}' AND ${table.color} IS NOT NULL AND ${table.yield} IS NOT NULL)
  //     `
  //   ),
  // ]
);
