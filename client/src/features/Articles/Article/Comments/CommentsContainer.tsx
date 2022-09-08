import { FC } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectComments, selectStatus } from './CommentsList/commentsListSlice';

import Loading from '../../../../components/UI/Loading';
import CommentsList from './CommentsList/CommentsList';

const CommentsContainer: FC<{}> = () => {
  const commentsData = useAppSelector(selectComments);
  const status = useAppSelector(selectStatus);

  let comments = <Loading />;

  if (status === 'success' && commentsData.length > 0) {
    comments = <CommentsList comments={commentsData} />;
  }

  if (status === 'success' && commentsData.length === 0) {
    comments = <p className="centered bold">No comments here... yet!</p>;
  }

  if (status === 'failed') {
    comments = (
      <p className="centered bold">Loading comments was not successfully!</p>
    );
  }

  return <>{comments}</>;
};

export default CommentsContainer;
