import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const manufacturerTable = pgTable("manufacturer", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
