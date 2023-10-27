import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter,createContext} from '@luego/api';
// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta({ ctx, type, errors }) {
    // checking that no procedures errored
    const allOk = errors.length === 0
    // checking we're doing a query request
    const isQuery = type === 'query'
    if (allOk && isQuery) { // todo ctx.res
      return {
        headers: {
          // 'cache-control': 'public, max-age=3, s-maxage=3',
        },
      }
    }
    return {}
  },
});