import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import {
  consumableJobTable,
  consumablePartTable,
  consumableTable,
  drumTable,
  jobTable,
  jobTimestampTable,
  jobUserTable,
  manufacturerTable,
  partTable,
  permissionTable,
  resetTokenTable,
  sessionTable,
  tonerTable,
  userTable,
} from "@/db/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({
  client: pool,
  schema: {
    ...consumableJobTable,
    ...consumablePartTable,
    ...consumableTable,
    ...drumTable,
    ...jobUserTable,
    ...jobTimestampTable,
    ...jobTable,
    ...manufacturerTable,
    ...partTable,
    ...permissionTable,
    ...resetTokenTable,
    ...sessionTable,
    ...tonerTable,
    ...userTable,
  },
});
