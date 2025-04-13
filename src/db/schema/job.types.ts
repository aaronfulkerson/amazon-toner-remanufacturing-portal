import { jobTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectJob = InferSelectModel<typeof jobTable>;
export type InsertJob = InferInsertModel<typeof jobTable>;
