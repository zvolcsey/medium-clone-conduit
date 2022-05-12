import { FC, Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Loading from '../UI/Loading';
import SideDrawer from './SideDrawer';

const Layout: FC<{}> = () => {
  const [showSideDrawer, setShowSideDrawer] = useState<boolean>(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  const closeSideDrawerHandler = () => {
    setShowSideDrawer(false);
  };

  return (
    <>
      <Header onHamburgerButtonClick={sideDrawerToggleHandler} />
      <SideDrawer show={showSideDrawer} onClose={closeSideDrawerHandler} />
      <main className={styles.main}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
