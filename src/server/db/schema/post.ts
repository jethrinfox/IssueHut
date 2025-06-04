import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("post", {
  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  createdById: text("createdById", { length: 255 }).notNull(),
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }),
});
