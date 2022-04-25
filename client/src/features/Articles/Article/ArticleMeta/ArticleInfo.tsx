import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { selectCurrentUser } from '../../../Auth/authSlice';

import styles from './ArticleInfo.module.css';
import FollowingButton from '../../../../components/UI/FollowingButton';

const ArticleMetaInfo: FC<{
  authorUsername: string;
  following: boolean;
  createdAt: string;
}> = (props) => {
  const { authorUsername, following, createdAt } = props;

  const currentUser = useAppSelector(selectCurrentUser);

  const isYou = currentUser === authorUsername;

  return (
    <div className={styles.info}>
      <div className={styles.author}>
        <Link to={`/profile/@${authorUsername}`}>{authorUsername}</Link>
        {isYou && <span>You</span>}
        {!isYou && (
          <FollowingButton username={authorUsername} following={following} />
        )}
      </div>
      <span className={styles.date}>{new Date(createdAt).toDateString()}</span>
    </div>
  );
};

export default ArticleMetaInfo;
