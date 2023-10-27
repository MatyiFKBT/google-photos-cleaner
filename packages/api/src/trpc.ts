import { TRPCError, inferRouterInputs, inferRouterOutputs, initTRPC } from '@trpc/server';
import { transformer } from '../transformer';
// import { createLogger } from 'server/logger';

import type { Context } from './context';
import { AppRouter } from './routers/_app';
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
	// transformer: superjson
});

const isAuth = t.middleware(async ({ ctx, next }) => {
	console.log(ctx.session)
	if (!ctx.session?.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Not authenticated'
		})
	}
	return next({
		ctx: {
			session: ctx.session
		},
	});
})

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const authProcedure = procedure.use(isAuth);

// infer types
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;