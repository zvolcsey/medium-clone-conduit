import { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectToken } from '../../../features/Auth/authSlice';

import NavItem from './NavItem';

const AuthNavItem: FC<{ path: string }> = (props) => {
  const { path, children } = props;

  const token = useAppSelector(selectToken);

  if (token) {
    return null;
  }

  return <NavItem path={path}>{children}</NavItem>;
};

export default AuthNavItem;
