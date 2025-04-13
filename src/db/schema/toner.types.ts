import { tonerTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectToner = InferSelectModel<typeof tonerTable>;
export type InsertToner = InferInsertModel<typeof tonerTable>;
