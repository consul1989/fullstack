import { trpc } from '../../lib/trpc';

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>All Ideas</h1>
      <ul>
        {data?.ideas.map((idea) => (
          <div key={idea.nick}>
            <h4>{idea.name}</h4>
            <div>{idea.description}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};
