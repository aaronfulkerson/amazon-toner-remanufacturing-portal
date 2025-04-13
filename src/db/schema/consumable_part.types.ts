import { consumablePartTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectConsumablePart = InferSelectModel<typeof consumablePartTable>;
export type InsertConsumablePart = InferInsertModel<typeof consumablePartTable>;
