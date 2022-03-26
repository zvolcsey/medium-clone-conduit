import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './TabItem.module.css';

const TabItem: FC<{ path: string; displayIfActive?: boolean }> = (props) => {
  return (
    <li className={styles['tabs-item']}>
      <NavLink
        to={props.path}
        className={({ isActive }) =>
          isActive
            ? styles['tabs-item--active']
            : props.displayIfActive
            ? styles['tabs-item--displayNone']
            : undefined
        }
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default TabItem;
