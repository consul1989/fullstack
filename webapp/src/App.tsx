import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getAllIdeasRoute, getViewIdeaRoute } from './lib/routes';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { TrpcProvider } from './lib/trpc';
import { ViewIdeaPage } from './pages/ViewideaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
          <Route path={getViewIdeaRoute({ ideaNick: ':ideaNick' })} element={<ViewIdeaPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
