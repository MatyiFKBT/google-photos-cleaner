import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { authOptions, getServerSession, type Session } from '@luego/auth'
import { prisma } from './prisma'

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {

	const { req, res } = opts
	const session = await getServerSession({ req, res })
	return createInnerTRPCContext({ session })
}

export type Context = inferAsyncReturnType<typeof createContext>