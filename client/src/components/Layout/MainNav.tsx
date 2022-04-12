import { FC } from 'react';

import styles from './MainNav.module.css';
import MainNavList from './MainNavList';

const MainNav: FC<{}> = () => {
  return (
    <nav aria-labelledby='main-navigation' className={styles.nav}>
      <MainNavList />
    </nav>
  );
};

export default MainNav;
