import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { jobTable, userTable } from "@/db/schema";

export const JOB_TIMESTAMP_TYPE = {
  BREAK_END: "break_end",
  BREAK_START: "break_start",
  JOB_END: "job_end",
  JOB_PAUSE: "job_pause",
  JOB_RESUME: "job_resume",
  JOB_START: "job_start",
  LUNCH_END: "lunch_end",
  LUNCH_START: "lunch_start",
  REPAIR_END: "repair_end",
  REPAIR_START: "repair_start",
} as const;
export const jobTimestampTypeEnum = pgEnum("job_timestamp_type", [
  JOB_TIMESTAMP_TYPE.BREAK_END,
  JOB_TIMESTAMP_TYPE.BREAK_START,
  JOB_TIMESTAMP_TYPE.JOB_END,
  JOB_TIMESTAMP_TYPE.JOB_PAUSE,
  JOB_TIMESTAMP_TYPE.JOB_RESUME,
  JOB_TIMESTAMP_TYPE.JOB_START,
  JOB_TIMESTAMP_TYPE.LUNCH_END,
  JOB_TIMESTAMP_TYPE.LUNCH_START,
  JOB_TIMESTAMP_TYPE.REPAIR_END,
  JOB_TIMESTAMP_TYPE.REPAIR_START,
]);

export const jobTimestampTable = pgTable("job_timestamp", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  comment: text("comment"),
  timestamp: timestamp("timestamp").defaultNow(),
  type: jobTimestampTypeEnum("type").notNull(),
});
