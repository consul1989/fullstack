import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas';
import { getIdeaTrpcRoute } from './getIdea';
import { getMeTrpcRoute } from './getMe';
import { createIdeaTrpcRoute } from './createIdea';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';
import { updateIdeaTrpcRoute } from './updateIdea';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getMe: getMeTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
