import { consumableTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectConsumable = InferSelectModel<typeof consumableTable>;
export type InsertConsumable = InferInsertModel<typeof consumableTable>;
