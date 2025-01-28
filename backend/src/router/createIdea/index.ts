import { trpc } from '../../lib/trpc';
import { ideas } from '../../lib/ideas';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  const idea = ideas.find((idea) => idea.nick === input.nick);

  if (idea) {
    throw Error(`Idea with nick '${input.nick}' already exists`);
  }

  ideas.unshift(input);

  return true;
});
