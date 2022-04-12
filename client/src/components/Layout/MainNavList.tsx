import { FC } from 'react';

import styles from './MainNavList.module.css';
import PublicNavItem from './NavItem/PublicNavItem';
import PrivateNavItem from './NavItem/PrivateNavItem';
import AuthNavItem from './NavItem/AuthNavItem';

const MainNavList: FC<{}> = () => {
  return (
    <ul id='main-navigation' className={styles.items}>
      <PublicNavItem path='/'>Home</PublicNavItem>
      <PrivateNavItem path='/feed'>Your Feed</PrivateNavItem>
      <PrivateNavItem path='/settings'>Settings</PrivateNavItem>
      <AuthNavItem path='/sign-in'>Sign In</AuthNavItem>
      <AuthNavItem path='/sign-up'>Sign Up</AuthNavItem>
    </ul>
  );
};

export default MainNavList;
