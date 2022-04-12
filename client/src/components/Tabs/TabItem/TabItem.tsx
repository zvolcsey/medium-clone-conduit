import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './TabItem.module.css';

const TabItem: FC<{ path: string | undefined; displayIfActive?: boolean }> = (
  props
) => {
  const { path, displayIfActive } = props;

  let content = <span>{props.children}</span>;

  if (path) {
    content = (
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? styles['tabs-item--active']
            : displayIfActive
            ? styles['tabs-item--displayNone']
            : undefined
        }
      >
        {props.children}
      </NavLink>
    );
  }

  return <li className={styles['tabs-item']}>{content}</li>;
};

export default TabItem;
