import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
import { getIdeasTrpcRoute } from './ideas/getIdeas';
import { getIdeaTrpcRoute } from './ideas/getIdea';
import { getMeTrpcRoute } from './auth/getMe';
import { createIdeaTrpcRoute } from './ideas/createIdea';
import { signInTrpcRoute } from './auth/signIn';
import { signUpTrpcRoute } from './auth/signUp';
import { updatePasswordTrpcRoute } from './auth/updatePassword';
import { updateIdeaTrpcRoute } from './ideas/updateIdea';
import { updateProfileTrpcRoute } from './auth/updateProfile';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getMe: getMeTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
