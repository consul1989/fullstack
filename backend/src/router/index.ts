import { trpc } from '../lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas';
import { getIdeaTrpcRoute } from './getIdea';
import { createIdeaTrpcRoute } from './createIdea';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
