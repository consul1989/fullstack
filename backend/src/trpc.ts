import { initTRPC } from '@trpc/server';
import _ from 'lodash';
import { z } from 'zod';

const ideas = _.times(50, (i) => ({
  nick: `nick-${i}`,
  name: `Name ${i}`,
  description: `Fuck ${i}`,
  text: _.times(50, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}));

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => ({ ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) })),
  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick);

      return { idea: idea || null };
    }),
});

export type TrpcRouter = typeof trpcRouter;
