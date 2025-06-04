import db from "@/server/db";
import { projects } from "@/server/db/schema";
import { projectInsertSchema } from "@/server/db/schema/project";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(projectInsertSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projects).values({
        description: input.description,
        name: input.name,
        ownerId: ctx.session.user.id,
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userProjects = await db.query.projects.findMany({
      where: (projects, { eq }) => eq(projects.ownerId, ctx.session.user.id),
    });

    return userProjects;
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userProject = await db.query.projects.findFirst({
        where: (projects, { and, eq }) =>
          and(
            eq(projects.id, input.id),
            eq(projects.ownerId, ctx.session.user.id),
          ),
      });

      if (!userProject) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return userProject;
    }),
  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       description: z.string().optional(),
  //       id: z.number(),
  //       name: z.string().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!input.name && !input.description) {
  //       throw new Error("No fields to update");
  //     }

  //     await ctx.db
  //       .update(projects)
  //       .set({ description: input.description, name: input.name })
  //       .where(eq(projects.id, input.id));
  //   }),
  // delete: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.delete(projects).where(eq(projects.id, input.id));
  //     const userLists = await ctx.db
  //       .select()
  //       .from(lists)
  //       .where(eq(projects.id, input.id));

  //     for (const list of userLists) {
  //       await ctx.db.delete(issues).where(eq(issues.listId, list.id));
  //       await ctx.db.delete(lists).where(eq(lists.id, list.id));
  //     }
  //   }),
});
