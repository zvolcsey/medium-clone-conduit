import { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';

const Home = lazy(() => {
  return import('./pages/Home');
});

const PageNotFound = lazy(() => {
  return import('./pages/PageNotFound');
});

const App: FC<{}> = () => {
  const routes = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={`?tag=:tagName`} element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  );

  return <>{routes}</>;
};

export default App;
