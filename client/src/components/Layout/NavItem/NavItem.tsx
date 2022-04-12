import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import '../../../index.css';
import styles from './NavItem.module.css';

const NavItem: FC<{ path: string }> = (props) => {
  const { path, children } = props;

  return (
    <li className={`${styles.item}`}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? styles['item--active'] : undefined
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
