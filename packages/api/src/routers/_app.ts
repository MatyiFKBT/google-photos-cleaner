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

	// TODO: move this to a separate router, and use google's js sdk to have type safety
	getAlbums: authProcedure.query(async ({ ctx }) => {
		const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems', {
			headers: {
				'Authorization': `Bearer ${ctx.session.access_token}`
			}
		})
		const json = await response.json()
		return json.mediaItems as {id:string, baseUrl:string}[]
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;