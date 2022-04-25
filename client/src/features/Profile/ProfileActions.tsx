import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../Auth/authSlice';

import '../../index.css';
import styles from './ProfileActions.module.css';
import FollowingButton from '../../components/UI/FollowingButton';
import EditArticleLink from './EditProfileLink';

const ProfileActions: FC<{ username: string; following: boolean }> = (
  props
) => {
  const { username, following } = props;

  const currentUser = useAppSelector(selectCurrentUser);

  const isYou = currentUser === username;

  return (
    <ul className={styles.actions}>
      <li className={styles.item}>
        {isYou && <span className='bold'>You</span>}
        {!isYou && (
          <FollowingButton username={username} following={following} />
        )}
      </li>
      {isYou && (
        <li className={styles.item}>
          <EditArticleLink />
        </li>
      )}
    </ul>
  );
};

export default ProfileActions;
