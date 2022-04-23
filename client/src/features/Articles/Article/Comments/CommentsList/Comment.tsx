import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Comment.module.css';
import Card from '../../../../../components/UI/Card';
import DeleteButton from '../../../../../components/UI/DeleteButton';

import type { CommentProperties } from '../../../../../../../server/src/types/appClasses';

const CommentPreview: FC<{
  comment: CommentProperties;
  currentUser: string | null;
  onDelete: (resourceId: string) => void;
}> = (props) => {
  const { comment, currentUser, onDelete } = props;

  const canDelete = currentUser === comment.author.username;

  const deleteCommentHandler = () => {
    onDelete(comment.resourceId);
  };

  return (
    <li>
      <article className={styles['comment-preview']}>
        <Card className={styles.card}>
          <div className={styles['comment-body']}>
            <p>{comment.body}</p>
          </div>
          <footer className={styles.actions}>
            <div className={styles.info}>
              <Link to={`/profile/@${comment.author.username}`}>
                {comment.author.username}
              </Link>
              <span className={styles.date}>
                {new Date(comment.createdAt).toDateString()}
              </span>
            </div>
            {canDelete && (
              <DeleteButton onClick={deleteCommentHandler}>
                Delete Comment
              </DeleteButton>
            )}
          </footer>
        </Card>
      </article>
    </li>
  );
};

export default CommentPreview;
