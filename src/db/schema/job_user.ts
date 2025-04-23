import { boolean, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { jobTable, userTable } from "@/db/schema";

export const jobUserTable = pgTable(
  "job_user",
  {
    jobId: integer("job_id")
      .notNull()
      .references(() => jobTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: integer("user_id")
      .notNull()
      .references(() => userTable.id),
    active: boolean("active").default(true),
  },
  (t) => [primaryKey({ columns: [t.jobId, t.userId] })]
);
