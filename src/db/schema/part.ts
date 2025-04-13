import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const partTable = pgTable("part", {
  id: serial("id").primaryKey(),
  descripiton: text("description"),
  model: text("model").notNull(),
});
