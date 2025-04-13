import { drumTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectDrum = InferSelectModel<typeof drumTable>;
export type InsertDrum = InferInsertModel<typeof drumTable>;
