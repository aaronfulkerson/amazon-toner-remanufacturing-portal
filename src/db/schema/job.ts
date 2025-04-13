import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { cartridgeTable } from "@/db/schema";

export const jobTable = pgTable("job", {
  id: serial("id").primaryKey(),
  cartridgeId: integer("cartridge_id")
    .notNull()
    .references(() => cartridgeTable.id),
});
