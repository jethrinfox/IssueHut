import { type InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

import { projects } from "./project";

const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  password: text("hashed_password").notNull(),
  username: text("username").notNull().unique(),
});

export const userRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export type User = InferSelectModel<typeof users>;

export const sessions = sqliteTable("session", {
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export type Session = InferSelectModel<typeof sessions>;

export default users;

export const signInSchema = z.object({
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(8, "Tiene que tener mas de 8 caracteres")
    .max(32, "Tiene que tener menos de 32 caracteres"),
  username: z
    .string({ required_error: "El nombre de usuario es requirido" })
    .min(4, "Tiene que tener mas de 4 caracteres")
    .max(32, "Tiene que tener menos de 32 caracteres"),
});
export type SignInForm = z.infer<typeof signInSchema>;

const changePasswordSchema = z.object({
  new_password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(8, "Tiene que tener mas de 8 caracteres")
    .max(32, "Tiene que tener menos de 32 caracteres"),
  old_password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(8, "Tiene que tener mas de 8 caracteres")
    .max(32, "Tiene que tener menos de 32 caracteres"),
});

export const refinedChangePasswordSchema = changePasswordSchema.refine(
  (values) => {
    return values.old_password !== values.new_password;
  },
);

export type ChangePassword = z.infer<typeof changePasswordSchema>;

export const changePasswordSchemaForm = changePasswordSchema
  .extend({
    validate_password: z.string({
      required_error: "La contraseña es requerida",
    }),
  })
  .refine(
    (values) => {
      return values.old_password !== values.new_password;
    },
    {
      message: "La contraseña nueva no puede ser igual a la vieja",
      path: ["new_password"],
    },
  )
  .refine(
    (values) => {
      return values.new_password === values.validate_password;
    },
    {
      message: "La contraseña nueva tiene que coincidir",
      path: ["validate_password"],
    },
  );

export type ChangePasswordForm = z.infer<typeof changePasswordSchemaForm>;
