import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { manufacturerTable } from "@/db/schema";

export const consumableTable = pgTable("consumable", {
  id: serial("id").primaryKey(),
  manufacturerId: integer("manufacturer_id").references(
    () => manufacturerTable.id
  ),
  model: text("model").notNull(),
});
