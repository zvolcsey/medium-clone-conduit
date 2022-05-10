import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectBioErrors } from './settingsSlice';

import styles from './Settings.module.css';
import Card from '../../components/UI/Card';
import ChangeBioForm from './ChangeForms/ChangeBioForm';
import Errors from '../../components/UI/Error/Errors';

const ChangeBio: FC<{
  username: string;
  bio?: string;
  token: string;
}> = (props) => {
  const { username, bio, token } = props;

  const errors = useAppSelector(selectBioErrors);

  return (
    <Card className={styles.card}>
      <h1>Change Bio</h1>
      <Errors errors={errors} className={styles.errors} />
      <ChangeBioForm username={username} bio={bio} token={token} />
    </Card>
  );
};

export default ChangeBio;
