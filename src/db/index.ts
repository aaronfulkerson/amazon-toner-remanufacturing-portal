import { Pool, neonConfig } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { sessionTable, userTable } from "@/db/schema";

config({ path: ".env" });

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle({
  client: pool,
  schema: {
    ...sessionTable,
    ...userTable,
  },
});
