import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import db from "@/server/db";
import { projects } from "@/server/db/schema";
import { listInsertSchema, lists } from "@/server/db/schema/lists";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const listRouter = createTRPCRouter({
  create: protectedProcedure
    .input(listInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await db.transaction(async (tx) => {
        const userProject = await tx.query.projects.findFirst({
          where: (projects, { and, eq }) =>
            and(eq(projects.id, input.projectId), eq(projects.ownerId, userId)),
        });

        if (!userProject) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project not found",
          });
        }

        const userLists = await tx.query.lists.findMany({
          orderBy: (lists, { desc }) => lists.order,
          where: (lists, { eq }) => eq(lists.projectId, input.projectId),
        });

        const newListOrder =
          userLists.length === 0
            ? 0
            : Math.max(...userLists.map((list) => list.order)) + 1;

        await tx.insert(lists).values({
          name: input.name,
          order: newListOrder,
          projectId: input.projectId,
        });
      });
    }),
  // getOne: protectedProcedure
  //   .input(
  //     z.object({
  //       projectId: z.number(),
  //       listId: z.number(),
  //     }),
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const userId = ctx.session.user.id;
  //     const userProjects = await ctx.db
  //       .select()
  //       .from(projects)
  //       .where(
  //         and(
  //           eq(projects.id, input.projectId),
  //           eq(projects.createdById, userId),
  //         ),
  //       );
  //     const project = userProjects[0];
  //     if (!project) {
  //       throw new Error("Project not found");
  //     }
  //     const userLists = await ctx.db
  //       .select()
  //       .from(lists)
  //       .where(
  //         and(eq(lists.id, input.listId), eq(lists.projectId, input.projectId)),
  //       );
  //     const list = userLists[0];
  //     if (!list) {
  //       throw new Error("List not found");
  //     }
  //     return list;
  //   }),
  getAll: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // const userId = ctx.session.user.id;

      const userLists = await db.query.lists.findMany({
        orderBy: (lists, { asc }) => asc(lists.order),
        where: (lists, { and, eq }) =>
          and(
            eq(lists.projectId, input.projectId),
            // TODO: Ensure the user owns the project
            // eq(projects.ownerId, userId),
          ),
      });

      return userLists;
    }),
  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //       name: z.string().optional(),
  //       description: z.string().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {}),
  // delete: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {}),
  // updateListsOrder: protectedProcedure
  //   .input(
  //     z.object({
  //       projectId: z.number(),
  //       listId: z.number(),
  //       newOrder: z.number(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session.user.id;
  //     const userProjects = await ctx.db
  //       .select()
  //       .from(projects)
  //       .where(
  //         and(
  //           eq(projects.id, input.projectId),
  //           eq(projects.createdById, userId),
  //         ),
  //       );
  //     const project = userProjects[0];
  //     if (!project) {
  //       throw new Error("Project not found");
  //     }
  //     const userLists = await ctx.db
  //       .select()
  //       .from(lists)
  //       .where(eq(lists.projectId, input.projectId));
  //     if (userLists.length === 0) {
  //       throw new Error("No lists in this project");
  //     }
  //     const newListsOrder = updateOrder(userLists, {
  //       id: input.listId,
  //       order: input.newOrder,
  //     });
  //     if (!newListsOrder) {
  //       throw new Error("An error occurred while updating the list order");
  //     }
  //     const sqlChunks: SQL[] = [];
  //     const ids: number[] = [];
  //     sqlChunks.push(sql`(case`);
  //     for (const list of newListsOrder) {
  //       sqlChunks.push(sql`when id = ${list.id} then ${list.order}`);
  //       ids.push(list.id);
  //     }
  //     sqlChunks.push(sql`end)`);
  //     const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));
  //     await ctx.db
  //       .update(lists)
  //       .set({ order: finalSql })
  //       .where(inArray(lists.id, ids));
  //   }),
});
