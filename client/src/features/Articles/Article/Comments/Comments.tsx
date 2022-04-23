import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { initCommentsAsync } from './CommentsList/commentsListSlice';
import { selectToken } from '../../../Auth/authSlice';
import { commentsUnload } from './commentSlice';

import styles from './Comments.module.css';
import NewComment from './NewComment/NewComment';
import CommentsContainer from './CommentsContainer';

const Comments: FC<{ articleResourceId: string }> = (props) => {
  const { articleResourceId } = props;

  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);

  useEffect(() => {
    dispatch(
      initCommentsAsync({
        token: token,
        articleResourceId: articleResourceId,
      })
    );

    return () => {
      dispatch(commentsUnload());
    };
  }, [dispatch]);

  return (
    <>
      <section className={styles.comments}>
        <h2>Comments: </h2>
        <NewComment articleResourceId={articleResourceId} token={token} />
        <CommentsContainer />
      </section>
    </>
  );
};

export default Comments;
