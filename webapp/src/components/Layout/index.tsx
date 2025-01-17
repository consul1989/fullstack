import { Link, Outlet } from 'react-router-dom';
import { getAllIdeasRoute } from '../../lib/routes';

export const Layout = () => {
  return (
    <div>
      <b>IdeaNick</b>
      <ul>
        <li>
          <Link to={getAllIdeasRoute()}>All ideas</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
