import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { selectCurrentUser } from '../../../Auth/authSlice';

import styles from './ArticleInfo.module.css';
import FollowingButton from '../../../../components/UI/Buttons/FollowingButton';

const ArticleMetaInfo: FC<{
  authorUsername: string;
  following: boolean;
  createdAt: string;
  updatedAt: string;
}> = (props) => {
  const { authorUsername, following, createdAt, updatedAt } = props;

  const currentUser = useAppSelector(selectCurrentUser);

  const isYou = currentUser === authorUsername;
  const createdAtDate = new Date(createdAt).toDateString();
  const updatedAtDate = new Date(updatedAt).toDateString();
  const isUpdated = new Date(updatedAt) > new Date(createdAt);

  return (
    <div className={styles.info}>
      <div className={styles.author}>
        <Link to={`/profile/@${authorUsername}`}>{authorUsername}</Link>
        {isYou && <span>You</span>}
        {!isYou && (
          <FollowingButton username={authorUsername} following={following} />
        )}
      </div>
      <span className={styles.date}>{`${isUpdated ? 'Edited: ' : 'Created: '}${
        isUpdated ? updatedAtDate : createdAtDate
      }`}</span>
    </div>
  );
};

export default ArticleMetaInfo;
