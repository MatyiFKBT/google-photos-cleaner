import { authProcedure, router } from "../trpc";
import { z } from 'zod';

export const postRouter = router({
	getAllPosts: authProcedure.query(({ ctx }) => {
		return ctx.prisma.post.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
					},
				}
			},
		});
	}),
	addPost: authProcedure.input(z.object({
		text: z.string(),
	})).mutation(({ input, ctx }) => {
		return ctx.prisma.post.create({
			data: {
				text: input.text,
				userId: ctx.session?.user.id,
			},

		});
	}),
});