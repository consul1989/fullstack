import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: [
        {
          id: 1,
          title: 'Fuck',
        },
      ],
    };
  }),
});

export type TrpcRouter = typeof trpcRouter;
