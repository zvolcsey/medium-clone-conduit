import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/Auth/authSlice';

import styles from './LogoutButton.module.css';
import Button from './Button';

const LogoutButton: FC<{ className?: string }> = (props) => {
  const { children, className } = props;

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/', { state: { from: location }, replace: true });
  };

  return (
    <Button className={`${styles.button} ${className}`} onClick={logoutHandler}>
      {children}
    </Button>
  );
};

export default LogoutButton;
