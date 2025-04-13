import { integer, pgTable } from "drizzle-orm/pg-core";
import { consumableTable } from "@/db/schema";

export const drumTable = pgTable("drum", {
  consumableId: integer("consumable_id").references(() => consumableTable.id),
});
