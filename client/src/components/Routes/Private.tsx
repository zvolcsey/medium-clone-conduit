import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Private: FC<{}> = (props) => {
  const { children } = props;

  const location = useLocation();
  const token = localStorage.getItem('Token');

  if (!token) {
    return <Navigate to="/sign-up" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default Private;
