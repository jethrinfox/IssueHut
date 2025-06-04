import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { lists } from "./lists";

export const issues = sqliteTable("issue", {
  description: text("description"),
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  listId: integer("list_id")
    .notNull()
    .references(() => lists.id),
  name: text("name").notNull(),
  order: integer("order").notNull(),
});

export const issuesRelations = relations(issues, ({ many, one }) => ({
  issues: many(issues),
  project: one(lists, {
    fields: [issues.listId],
    references: [lists.id],
  }),
}));

export const issueInsertSchema = createInsertSchema(issues, {
  listId: z.number().int().positive(),
}).omit({
  id: true,
  order: true,
});

export const issueInsertFormSchema = createInsertSchema(issues).omit({
  id: true,
  listId: true,
  order: true,
});

export type IssueSelect = typeof issues.$inferSelect;
export type IssueInsertFormSchema = z.infer<typeof issueInsertFormSchema>;
