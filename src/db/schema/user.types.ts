import { userTable } from "@/db/schema";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectUser = InferSelectModel<typeof userTable>;
export type SelectUserOmitPasswordHash = Omit<SelectUser, "passwordHash">;
export type InsertUser = InferInsertModel<typeof userTable>;
export type UpdateUser = Partial<Omit<InsertUser, "id">>;
