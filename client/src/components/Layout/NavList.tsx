import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/Auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faPenToSquare,
  faRightToBracket,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import styles from './NavList.module.css';
import PublicNavItem from './NavItem/PublicNavItem';
import PrivateNavItem from './NavItem/PrivateNavItem';
import AuthNavItem from './NavItem/AuthNavItem';

const NavList: FC<{
  id: 'main-navigation' | 'side-drawer-navigation';
  className?: string;
  onItemClick?: () => void;
}> = (props) => {
  const { id, className, onItemClick } = props;

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <ul id={id} className={`${styles.items} ${className}`}>
      <PublicNavItem path="/" onClick={onItemClick}>
        Home
      </PublicNavItem>
      <PrivateNavItem path="/feed" onClick={onItemClick}>
        Your Feed
      </PrivateNavItem>
      <PrivateNavItem path="/editor" end={true} onClick={onItemClick}>
        <FontAwesomeIcon icon={faPenToSquare} />
        Create Article
      </PrivateNavItem>
      <PrivateNavItem path={`/profile/@${currentUser}`} onClick={onItemClick}>
        <FontAwesomeIcon icon={faUser} />
        {currentUser}
      </PrivateNavItem>
      <PrivateNavItem path="/settings" onClick={onItemClick}>
        <FontAwesomeIcon icon={faGear} />
        Settings
      </PrivateNavItem>
      <AuthNavItem path="/sign-in" onClick={onItemClick}>
        <FontAwesomeIcon icon={faRightToBracket} />
        Sign In
      </AuthNavItem>
      <AuthNavItem path="/sign-up" onClick={onItemClick}>
        <FontAwesomeIcon icon={faUserPlus} />
        Sign Up
      </AuthNavItem>
    </ul>
  );
};

export default NavList;
