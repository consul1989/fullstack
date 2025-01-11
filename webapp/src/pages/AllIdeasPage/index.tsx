import { trpc } from '../../lib/trpc';

export const AllIdeasPage = () => {
  const result = trpc.getIdeas.useQuery();

  console.log(result);

  return <div>AllIdeasPage</div>;
};
