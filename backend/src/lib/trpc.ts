import { initTRPC } from '@trpc/server';
import type { Express } from 'express';
import type { TrpcRouter } from '../router';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AppContext } from './ctx';
import { expressHandler } from 'trpc-playground/handlers/express';
import superjson from 'superjson';

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
});

export const applyTrpcExpressApp = async (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  );

  expressApp.use(
    '/trpc-playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  );
};
