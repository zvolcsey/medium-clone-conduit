import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectToken } from '../../features/Auth/authSlice';
import { useAppSelector } from '../../app/hooks';

const Private: FC<{}> = (props) => {
  const { children } = props;

  const location = useLocation();
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to='/sign-up' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default Private;
