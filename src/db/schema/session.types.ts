import { sessionTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectSession = InferSelectModel<typeof sessionTable>;
export type InsertSession = InferInsertModel<typeof sessionTable>;
export type UpdateSession = Partial<InsertSession>;
