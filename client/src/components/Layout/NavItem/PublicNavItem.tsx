import { FC } from 'react';

import NavItem from './NavItem';

const PublicNavItem: FC<{
  path: string;
  end?: boolean;
  onClick?: () => void | undefined;
}> = (props) => {
  const { path, end, children, onClick } = props;

  return (
    <NavItem path={path} end={end} onClick={onClick}>
      {children}
    </NavItem>
  );
};

export default PublicNavItem;
