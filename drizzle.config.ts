import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env"] });

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schema/*",
});
