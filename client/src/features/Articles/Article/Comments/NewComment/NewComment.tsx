import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../../app/hooks';
import { selectError } from './newCommentSlice';

import styles from './NewComment.module.css';
import Card from '../../../../../components/UI/Card';
import NewCommentForm from './NewCommentForm';
import Errors from '../../../../../components/UI/Error/Errors';

const NewComment: FC<{ articleResourceId: string; token: string | null }> = (
  props
) => {
  const { articleResourceId, token } = props;

  const error = useAppSelector(selectError);

  return (
    <Card className={styles.card}>
      <h2>Create a new comment</h2>
      <Errors errors={error} className={styles.errors} />
      {!token && (
        <p>
          Please <Link to='/sign-up'>sign up</Link> or{' '}
          <Link to='/sign-in'>sign in</Link>
        </p>
      )}
      {token && (
        <NewCommentForm articleResourceId={articleResourceId} token={token} />
      )}
    </Card>
  );
};

export default NewComment;
