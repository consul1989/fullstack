import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: [
        {
          nick: 1,
          name: 'Name',
          description: 'Fuck',
        },
        {
          nick: 2,
          name: 'Name 2',
          description: 'Fuck 2',
        },
      ],
    };
  }),
});

export type TrpcRouter = typeof trpcRouter;
