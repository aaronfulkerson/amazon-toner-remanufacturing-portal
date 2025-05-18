import { TablesRelationalConfig } from "drizzle-orm";
import { NeonTransaction } from "drizzle-orm/neon-serverless";
import { db } from "@/db";

export type DbExecutor =
  | NeonTransaction<typeof db._.fullSchema, TablesRelationalConfig>
  | typeof db;
