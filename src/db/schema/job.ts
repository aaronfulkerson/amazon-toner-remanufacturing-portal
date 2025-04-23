import { pgTable, serial } from "drizzle-orm/pg-core";

export const jobTable = pgTable("job", {
  id: serial("id").primaryKey(),
});
