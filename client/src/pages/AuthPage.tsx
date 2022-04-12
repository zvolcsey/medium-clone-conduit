import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { selectAppName } from '../app/common-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Auth from '../features/Auth/Auth';
import { authPageUnload } from '../features/Auth/authSlice';

const AuthPage: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const appName = useAppSelector(selectAppName);

  const pageName = location.pathname === '/sign-in' ? 'Sign In' : 'Sign Up';

  useEffect(() => {
    document.title = `${pageName} | ${appName}`;

    return () => {
      dispatch(authPageUnload());
    };
  }, [dispatch, pageName, appName]);

  return (
    <>
      <Auth
        type={pageName === 'Sign In' ? 'sign-in' : 'sign-up'}
        title={pageName}
      />
    </>
  );
};

export default AuthPage;
