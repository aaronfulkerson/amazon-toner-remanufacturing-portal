import { jobUserTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectJobUser = InferSelectModel<typeof jobUserTable>;
export type InsertJobUser = InferInsertModel<typeof jobUserTable>;
