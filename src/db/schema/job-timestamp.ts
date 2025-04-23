import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { jobTable, userTable } from "@/db/schema";

export const JobTimestampType = {
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
  JobTimestampType.BREAK_END,
  JobTimestampType.BREAK_START,
  JobTimestampType.JOB_END,
  JobTimestampType.JOB_PAUSE,
  JobTimestampType.JOB_RESUME,
  JobTimestampType.JOB_START,
  JobTimestampType.LUNCH_END,
  JobTimestampType.LUNCH_START,
  JobTimestampType.REPAIR_END,
  JobTimestampType.REPAIR_START,
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
