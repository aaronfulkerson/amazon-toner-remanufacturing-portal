import { cartridgeTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectCartridge = InferSelectModel<typeof cartridgeTable>;
export type InsertCartridge = InferInsertModel<typeof cartridgeTable>;
