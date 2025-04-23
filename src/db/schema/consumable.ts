import { index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { manufacturerTable } from "@/db/schema";

export const consumableTable = pgTable(
  "consumable",
  {
    id: serial("id").primaryKey(),
    manufacturerId: integer("manufacturer_id")
      .notNull()
      .references(() => manufacturerTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    model: text("model").notNull(),
  },
  (t) => [index("manufacturer_id_idx").on(t.manufacturerId)]
);
