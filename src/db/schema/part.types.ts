import { partTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectPart = InferSelectModel<typeof partTable>;
export type InsertPart = InferInsertModel<typeof partTable>;
