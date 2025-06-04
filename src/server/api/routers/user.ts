import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from "@/server/auth/utils";
import { refinedChangePasswordSchema } from "@/server/db/schema/user";
import changePassword from "@/server/utils/changePassword";

export const userRouter = createTRPCRouter({
  changePassword: protectedProcedure
    .input(refinedChangePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await changePassword(userId, input);
    }),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await invalidateSession(ctx.session.session.id);
    await deleteSessionTokenCookie();
  }),
});
