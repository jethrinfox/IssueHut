import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { issues } from "./issues";
import { projects } from "./project";

export const lists = sqliteTable("list", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id),
});

export const listRelations = relations(lists, ({ many, one }) => ({
  issues: many(issues),
  project: one(projects, {
    fields: [lists.projectId],
    references: [projects.id],
  }),
}));

export const listInsertSchema = createInsertSchema(lists, {
  projectId: z.number().int().positive(),
}).omit({
  id: true,
  order: true,
});

export const listInsertFormSchema = createInsertSchema(lists).omit({
  id: true,
  projectId: true,
});

export type ListSelect = typeof lists.$inferSelect;
export type ListInsertFormSchema = z.infer<typeof listInsertFormSchema>;
