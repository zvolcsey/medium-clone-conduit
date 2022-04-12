import { FC } from 'react';

import NavItem from './NavItem';

const PublicNavItem: FC<{ path: string }> = (props) => {
  const { path, children } = props;

  return <NavItem path={path}>{children}</NavItem>;
};

export default PublicNavItem;
