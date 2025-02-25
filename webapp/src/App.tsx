import './styles/global.scss';
import * as routes from './lib/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AllIdeasPage } from './pages/ideas/AllIdeasPage';
import { AppContextProvider } from './lib/ctx';
import { EditIdeaPage } from './pages/ideas/EditIdeaPage';
import { EditProfilePage } from './pages/auth/EditProfilePage';
import { Layout } from './components/Layout';
import { NewIdeaPage } from './pages/ideas/NewIdeaPage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignOutPage } from './pages/auth/SignOutPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { TrpcProvider } from './lib/trpc';
import { ViewIdeaPage } from './pages/ideas/ViewideaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route path={routes.getEditProfileRoute()} element={<EditProfilePage />} />
              <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};
