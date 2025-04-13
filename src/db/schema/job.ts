import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { consumableTable } from "@/db/schema";

export const jobTable = pgTable("job", {
  id: serial("id").primaryKey(),
  consumableId: integer("consumable_id")
    .notNull()
    .references(() => consumableTable.id),
});
