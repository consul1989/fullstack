import './styles/global.scss';
import * as routes from './lib/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AllIdeasPage } from './pages/AllIdeasPage';
import { Layout } from './components/Layout';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { TrpcProvider } from './lib/trpc';
import { ViewIdeaPage } from './pages/ViewideaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
