import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import db from "@/server/db";
import { issueInsertSchema, issues } from "@/server/db/schema/issues";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const issueRouter = createTRPCRouter({
  create: protectedProcedure
    .input(issueInsertSchema)
    .mutation(async ({ ctx, input }) => {
      // const userId = ctx.session.user.id;

      await db.transaction(async (tx) => {
        const userList = await tx.query.lists.findFirst({
          where: (list, { eq }) => eq(list.id, input.listId),
        });

        if (!userList) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "List not found",
          });
        }

        const userIssues = await tx.query.issues.findMany({
          orderBy: (issue, { asc }) => asc(issue.order),
          where: (issue, { eq }) => eq(issue.listId, input.listId),
        });

        const newIssueOrder =
          userIssues.length === 0
            ? 0
            : Math.max(...userIssues.map((list) => list.order)) + 1;

        await tx.insert(issues).values({
          listId: input.listId,
          name: input.name,
          order: newIssueOrder,
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
        listId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // const userId = ctx.session.user.id;

      const userIssues = await db.query.issues.findMany({
        orderBy: (issues, { asc }) => asc(issues.order),
        where: (issues, { and, eq }) =>
          and(
            eq(issues.listId, input.listId),
            // TODO: Ensure the user owns the project
            // eq(projects.ownerId, userId),
          ),
      });

      return userIssues;
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
