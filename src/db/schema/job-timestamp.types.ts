import { jobTimestampTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectJobTimestamp = InferSelectModel<typeof jobTimestampTable>;
export type InsertJobTimestamp = InferInsertModel<typeof jobTimestampTable>;
