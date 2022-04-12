import { FC, useEffect } from 'react';
import { selectAppName } from '../app/common-slice';
import { useAppSelector } from '../app/hooks';

import styles from './SettingsPage.module.css';
import Card from '../components/UI/Card';
import LogoutButton from '../components/UI/LogoutButton';

const SettingsPage: FC<{}> = () => {
  const appName = useAppSelector(selectAppName);

  useEffect(() => {
    document.title = `Settings | ${appName}`;
  }, [appName]);

  return (
    <>
      <Card className={styles.card}>
        <LogoutButton>Logout</LogoutButton>
      </Card>
    </>
  );
};

export default SettingsPage;
