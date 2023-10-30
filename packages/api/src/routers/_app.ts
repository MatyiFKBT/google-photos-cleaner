import { router } from '../trpc';
import { photoRouter } from './photos.router';

export const appRouter = router({
	photos: photoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;