import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectToken } from '../../features/Auth/authSlice';
import { useAppSelector } from '../../app/hooks';

const Auth: FC<{}> = (props) => {
  const { children } = props;

  const location = useLocation();
  const token = useAppSelector(selectToken);

  if (!token) {
    return <>{children}</>;
  }

  return <Navigate to="/feed" state={{ from: location }} replace />;
};

export default Auth;
