import { trpc } from '../lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas';
import { getIdeaTrpcRoute } from './getIdea';
import { createIdeaTrpcRoute } from './createIdea';
import { signUpTrpcRoute } from './signUp';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
