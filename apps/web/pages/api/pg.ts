import { NextApiHandler } from 'next'
import { appRouter } from '@luego/api'
import { nextHandler } from 'trpc-playground/handlers/next'

const setupHandler = nextHandler({
  router: appRouter,
  trpcApiEndpoint: '/api/trpc',
  playgroundEndpoint: '/api/pg',
  request: {
    // superjson: true,
  },
})

const handler: NextApiHandler = async (req, res) => {
  const playgroundHandler = await setupHandler
  await playgroundHandler(req, res)
}

export default handler