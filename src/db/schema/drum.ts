import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { consumableTable } from "@/db/schema";

export const drumTable = pgTable("drum", {
  id: serial("id").primaryKey(),
  consumableId: integer("consumable_id").references(() => consumableTable.id),
});
