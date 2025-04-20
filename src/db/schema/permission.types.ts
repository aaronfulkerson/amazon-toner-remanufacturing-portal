import { permissionTable } from "./permission";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectPermission = InferSelectModel<typeof permissionTable>;
export type InsertPermission = InferInsertModel<typeof permissionTable>;
