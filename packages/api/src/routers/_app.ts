import { z } from 'zod';
import { authProcedure, procedure, router } from '../trpc';
import { postRouter } from './post';
import { photoRouter } from './photos.router';

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

	// TODO: move this to a separate router, and use google's js sdk to have type safety
	photos: photoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;