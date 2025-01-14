import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: [
        {
          nick: 'nick-1',
          name: 'Name',
          description: 'Fuck',
        },
        {
          nick: 'nick-2',
          name: 'Name 2',
          description: 'Fuck 2',
        },
        {
          nick: 'nick-3',
          name: 'Name 3',
          description: 'Fuck 3',
        },
      ],
    };
  }),
});

export type TrpcRouter = typeof trpcRouter;
