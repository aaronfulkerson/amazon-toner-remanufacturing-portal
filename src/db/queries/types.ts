import { db } from "@/db";

import type { TablesRelationalConfig } from "drizzle-orm";
import type { NeonTransaction } from "drizzle-orm/neon-serverless";

export type DbExecutor =
  | NeonTransaction<typeof db._.fullSchema, TablesRelationalConfig>
  | typeof db;
