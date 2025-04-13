import { manufacturerTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectManufacturer = InferSelectModel<typeof manufacturerTable>;
export type InsertManufacturer = InferInsertModel<typeof manufacturerTable>;
