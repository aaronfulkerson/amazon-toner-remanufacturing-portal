import { resetTokenTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectResetToken = InferSelectModel<typeof resetTokenTable>;
export type InsertResetToken = InferInsertModel<typeof resetTokenTable>;
