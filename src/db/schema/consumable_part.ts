import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { consumableTable, partTable } from "@/db/schema";

export const consumablePartTable = pgTable(
  "consumable_part",
  {
    consumableId: integer("consumable_id").references(() => consumableTable.id),
    partId: integer("part_id").references(() => partTable.id),
  },
  (t) => [primaryKey({ columns: [t.consumableId, t.partId] })]
);
