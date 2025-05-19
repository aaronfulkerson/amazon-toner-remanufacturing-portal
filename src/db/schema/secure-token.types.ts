import { secureTokenTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectSecureToken = InferSelectModel<typeof secureTokenTable>;
export type InsertSecureToken = InferInsertModel<typeof secureTokenTable>;
