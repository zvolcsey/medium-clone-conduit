import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import '../../../index.css';
import styles from './NavItem.module.css';

const NavItem: FC<{
  path: string;
  end?: boolean;
  className?: string;
  onClick?: () => void;
}> = (props) => {
  const { path, end, className, children, onClick } = props;

  return (
    <li className={`${styles.item} ${className}`}>
      <NavLink
        to={path}
        end={end || false}
        className={({ isActive }) =>
          isActive ? styles['item--active'] : undefined
        }
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
