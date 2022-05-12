import { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectToken } from '../../../features/Auth/authSlice';

import NavItem from './NavItem';

const PrivateNavItem: FC<{
  path: string;
  end?: boolean;
  onClick?: () => void | undefined;
}> = (props) => {
  const { path, end, children, onClick } = props;

  const token = useAppSelector(selectToken);

  if (!token) {
    return null;
  }

  return (
    <NavItem path={path} end={end} onClick={onClick}>
      {children}
    </NavItem>
  );
};

export default PrivateNavItem;
