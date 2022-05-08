import { FC } from 'react';

import NavItem from './NavItem';

const PublicNavItem: FC<{ path: string; end?: boolean }> = (props) => {
  const { path, end, children } = props;

  return (
    <NavItem path={path} end={end}>
      {children}
    </NavItem>
  );
};

export default PublicNavItem;
