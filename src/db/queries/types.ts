import { db } from "@/db";

import type { ExtractTablesWithRelations } from "drizzle-orm";
import type {
  NeonDatabase,
  NeonTransaction,
} from "drizzle-orm/neon-serverless";

type FullSchema = typeof db._.fullSchema;
export type DbContext =
  | NeonDatabase<FullSchema>
  | NeonTransaction<FullSchema, ExtractTablesWithRelations<FullSchema>>;
