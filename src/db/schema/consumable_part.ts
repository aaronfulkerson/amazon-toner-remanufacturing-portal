import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { consumableTable, partTable } from "@/db/schema";

export const consumablePartTable = pgTable(
  "consumable_part",
  {
    consumableId: integer("consumable_id")
      .notNull()
      .references(() => consumableTable.id),
    partId: integer("part_id")
      .notNull()
      .references(() => partTable.id),
    quantity: integer("quantity").default(1),
  },
  (t) => [primaryKey({ columns: [t.consumableId, t.partId] })]
);
