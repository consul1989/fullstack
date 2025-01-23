import { initTRPC } from '@trpc/server';
import type { Express } from 'express';
import type { TrpcRouter } from '../router';
import * as trpcExpress from '@trpc/server/adapters/express';

export const trpc = initTRPC.create();

export const applyTrpcExpressApp = (expressApp: Express, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  );
};