import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { lists } from "./lists";

export const issues = sqliteTable("issue", {
  description: text("description"),
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  listId: integer("list_id")
    .notNull()
    .references(() => lists.id),
  name: text("name").notNull(),
});

export const issuesRelations = relations(issues, ({ many, one }) => ({
  issues: many(issues),
  project: one(lists, {
    fields: [issues.listId],
    references: [lists.id],
  }),
}));
