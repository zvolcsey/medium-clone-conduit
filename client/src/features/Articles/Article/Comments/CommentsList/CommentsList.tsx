import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectCurrentUser, selectToken } from '../../../../Auth/authSlice';
import { deleteCommentAsync } from '../commentSlice';
import { deleteComment } from './commentsListSlice';

import styles from './CommentsList.module.css';
import CommentPreview from './Comment';
import DeleteModal from '../../../../../components/UI/Modal/DeleteModal';

import type { CommentProperties } from '../../../../../../../server/src/types/appClasses';
import type { DeleteCommentPayload } from '../../../../../app/types/redux.types';

const CommentsList: FC<{ comments: CommentProperties[] }> = (props) => {
  const { comments } = props;

  const dispatch = useAppDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<string>('');

  const token = useAppSelector(selectToken);

  const param = useParams();

  const showDeleteModalHandler = (resourceId: string) => {
    setShowDeleteModal(true);
    setSelectedComment(resourceId);
  };
  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const deleteCommentHandler = () => {
    const reqData: DeleteCommentPayload = {
      token: token!,
      articleResourceId: param.resourceId!,
      commentResourceId: selectedComment,
    };
    dispatch(deleteCommentAsync(reqData));
    dispatch(deleteComment(selectedComment));
    setShowDeleteModal(false);
  };

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          onClose={closeDeleteModalHandler}
          onConfirm={deleteCommentHandler}
        />
      )}
      <ul className={styles.list}>
        {comments.map((comment) => (
          <CommentPreview
            key={comment.resourceId}
            comment={comment}
            currentUser={currentUser}
            onDelete={showDeleteModalHandler}
          />
        ))}
      </ul>
    </>
  );
};

export default CommentsList;
