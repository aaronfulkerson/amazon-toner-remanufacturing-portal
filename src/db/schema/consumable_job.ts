import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { consumableTable, jobTable } from "@/db/schema";

export const consumableJobTable = pgTable(
  "consumable_job",
  {
    jobId: integer("job_id")
      .notNull()
      .references(() => jobTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    consumableId: integer("consumable_id")
      .notNull()
      .references(() => consumableTable.id),
  },
  (t) => [primaryKey({ columns: [t.consumableId, t.jobId] })]
);
