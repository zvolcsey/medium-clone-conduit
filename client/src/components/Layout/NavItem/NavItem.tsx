import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import '../../../index.css';
import styles from './NavItem.module.css';

const NavItem: FC<{ path: string; end?: boolean }> = (props) => {
  const { path, end, children } = props;

  return (
    <li className={`${styles.item}`}>
      <NavLink
        to={path}
        end={end || false}
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
