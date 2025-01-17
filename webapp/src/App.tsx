import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getAllIdeasRoute, getViewIdeaRoute, viewIdeaRouteParams } from './lib/routes';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc';
import { ViewIdeaPage } from './pages/ViewideaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
          <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
