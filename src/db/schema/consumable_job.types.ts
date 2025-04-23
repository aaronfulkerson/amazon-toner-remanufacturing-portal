import { consumableJobTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectConsumableJob = InferSelectModel<typeof consumableJobTable>;
export type InsertConsumableJob = InferInsertModel<typeof consumableJobTable>;
