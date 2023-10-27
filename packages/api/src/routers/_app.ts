import { z } from 'zod';
import { authProcedure, procedure, router } from '../trpc';
import { postRouter } from './post';

export const appRouter = router({
	hello: procedure
		.input(
			z.object({
				text: z.string(),
			}),
		)
		.query(({ input }) => {
			return {
				greeting: `hello ${input.text}`,
			};
		}),
	secret: authProcedure.query(({ ctx }) => {
		return {
			secret: ctx.session?.user?.email,
		};
	}),
	post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;