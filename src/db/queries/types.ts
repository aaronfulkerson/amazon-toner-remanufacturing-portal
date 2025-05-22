import { db } from "@/db";

import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { NeonTransaction } from "drizzle-orm/neon-serverless";

type FullSchema = typeof db._.fullSchema;
export type DbContext =
  | NeonTransaction<FullSchema, ExtractTablesWithRelations<FullSchema>>
  | typeof db;
