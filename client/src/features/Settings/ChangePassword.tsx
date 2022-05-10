import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectPasswordErrors } from './settingsSlice';

import styles from './Settings.module.css';
import Card from '../../components/UI/Card';
import ChangePasswordForm from './ChangeForms/ChangePasswordForm';
import Errors from '../../components/UI/Error/Errors';

const ChangePassword: FC<{
  token: string;
}> = (props) => {
  const { token } = props;

  const errors = useAppSelector(selectPasswordErrors);

  return (
    <Card className={styles.card}>
      <h1>Change Password</h1>
      <Errors errors={errors} className={styles.errors} />
      <ChangePasswordForm token={token} />
    </Card>
  );
};

export default ChangePassword;
