import { FC, useEffect } from 'react';
import { selectAppName } from '../app/common-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getEditedProfileAsync,
  selectProfile,
  selectProfileStatus,
  settingsPageUnload,
} from '../features/Settings/settingsSlice';
import { selectCurrentUser, selectToken } from '../features/Auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import styles from './SettingsPage.module.css';
import Card from '../components/UI/Card';
import LogoutButton from '../components/UI/Buttons/LogoutButton';
import Loading from '../components/UI/Loading';
import ChangeUsername from '../features/Settings/ChangeUsername';
import ChangePassword from '../features/Settings/ChangePassword';
import ChangeBio from '../features/Settings/ChangeBio';

const SettingsPage: FC<{}> = () => {
  const dispatch = useAppDispatch();

  const appName = useAppSelector(selectAppName);
  const currentUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
  const profile = useAppSelector(selectProfile);
  const status = useAppSelector(selectProfileStatus);

  useEffect(() => {
    document.title = `Settings | ${appName}`;
  }, [appName]);

  useEffect(() => {
    if (token && currentUser) {
      dispatch(
        getEditedProfileAsync({ token: token!, username: currentUser! })
      );
    }
  }, [dispatch, token, currentUser]);

  useEffect(() => {
    return () => {
      dispatch(settingsPageUnload());
    };
  }, [dispatch]);

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'success' && profile && (
        <div>
          <ChangeUsername username={profile.username} token={token!} />
          <ChangePassword token={token!} />
          <ChangeBio
            username={profile.username}
            bio={profile.bio}
            token={token!}
          />
        </div>
      )}
      {status === 'failed' && (
        <p className={`${styles.error} centered bold`}>
          Loading default user data was not successfully
        </p>
      )}
      <Card className={`${styles.card} ${styles['logout-card']}`}>
        <LogoutButton>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </LogoutButton>
      </Card>
    </>
  );
};

export default SettingsPage;
