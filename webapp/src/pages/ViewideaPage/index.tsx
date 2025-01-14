import { useParams } from 'react-router-dom';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams();

  return (
    <div>
      <h1>{ideaNick}</h1>
      <div>Description of Idea</div>
      <ul>
        <li>Idea 1</li>
        <li>Idea 2</li>
        <li>Idea 3</li>
      </ul>
    </div>
  );
};
