import { Link } from 'react-router-dom';

import { getViewIdeaRoute } from '../../lib/routes';
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
            <h4>
              <Link to={getViewIdeaRoute({ ideaNick: idea.nick })}>{idea.name}</Link>
            </h4>
            <div>{idea.description}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};
