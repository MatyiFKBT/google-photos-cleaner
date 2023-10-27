import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession as gSS } from "next-auth";

import { authOptions } from "./auth-options";

export const getServerSession = async (
  ctx:
    | {
      req: GetServerSidePropsContext["req"];
      res: GetServerSidePropsContext["res"];
    }
    | { req: NextApiRequest; res: NextApiResponse }
) => {
  return await gSS(ctx.req, ctx.res, authOptions);
};

export type Session = ReturnType<typeof getServerSession> | null;