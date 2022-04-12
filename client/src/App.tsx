import { FC, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { authCheckAsync } from './features/Auth/authSlice';

import Layout from './components/Layout/Layout';
import Private from './components/Routes/Private';
import Auth from './components/Routes/Auth';

const Home = lazy(() => {
  return import('./pages/Home');
});

const AuthPage = lazy(() => {
  return import('./pages/AuthPage');
});

const ProfilePage = lazy(() => {
  return import('./pages/ProfilePage');
});

const ArticlePage = lazy(() => {
  return import('./pages/ArticlePage');
});

const SettingsPage = lazy(() => {
  return import('./pages/SettingsPage');
});

const PageNotFound = lazy(() => {
  return import('./pages/PageNotFound');
});

const App: FC<{}> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      dispatch(authCheckAsync(token));
    }
  }, [dispatch]);

  const routes = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path='feed'
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route path='tag/:tagName' element={<Home />} />
        <Route
          path='sign-in'
          element={
            <Auth>
              <AuthPage />
            </Auth>
          }
        />
        <Route
          path='sign-up'
          element={
            <Auth>
              <AuthPage />
            </Auth>
          }
        />
        <Route path='profile/@:username' element={<ProfilePage />} />
        <Route path='settings' element={<SettingsPage />} />
        <Route
          path='article/:articleSlugWithResourceId'
          element={<ArticlePage />}
        />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  );

  return <>{routes}</>;
};

export default App;
