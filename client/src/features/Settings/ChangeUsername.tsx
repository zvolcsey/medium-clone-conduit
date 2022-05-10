import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUsernameErrors } from './settingsSlice';

import styles from './Settings.module.css';
import Card from '../../components/UI/Card';
import ChangeUsernameForm from './ChangeForms/ChangeUsernameForm';
import Errors from '../../components/UI/Error/Errors';

const ChangeUsername: FC<{
  username: string;
  token: string;
}> = (props) => {
  const { username, token } = props;

  const errors = useAppSelector(selectUsernameErrors);

  return (
    <Card className={styles.card}>
      <h1>Change Username</h1>
      <Errors errors={errors} className={styles.errors} />
      <ChangeUsernameForm username={username} token={token} />
    </Card>
  );
};

export default ChangeUsername;
