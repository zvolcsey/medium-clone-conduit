import { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';

const Home = lazy(() => {
  return import('./pages/Home');
});

const ProfilePage = lazy(() => {
  return import('./pages/ProfilePage');
});

const ArticlePage = lazy(() => {
  return import('./pages/ArticlePage');
});

const PageNotFound = lazy(() => {
  return import('./pages/PageNotFound');
});

const App: FC<{}> = () => {
  const routes = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='feed' element={<Home />} />
        <Route path='tag/:tagName' element={<Home />} />
        <Route path='profile/@:username' element={<ProfilePage />} />
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
