import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { lists } from "./lists";
import users from "./user";

export const projects = sqliteTable("project", {
  description: text("description"),
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id),
});

export const projectRelations = relations(projects, ({ many, one }) => ({
  lists: many(lists),
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
  }),
}));

export const projectInsertSchema = createInsertSchema(projects).omit({
  id: true,
  ownerId: true,
});

export const projectInsertFormSchema = createInsertSchema(projects).omit({
  id: true,
  ownerId: true,
});

export type ProjectSelect = typeof projects.$inferSelect;
export type ProjectInsertFormSchema = z.infer<typeof projectInsertFormSchema>;
