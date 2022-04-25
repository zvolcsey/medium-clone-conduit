import { FC, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectCurrentUser, selectToken } from '../../../../Auth/authSlice';
import { deleteArticleAsync } from '../../articleSlice';

import styles from './ArticleActions.module.css';
import FavoriteButton from '../../../../../components/UI/Buttons/FavoriteButton';
import EditArticleLink from './EditArticleLink';
import DeleteButton from '../../../../../components/UI/Buttons/DeleteButton';
import DeleteModal from '../../../../../components/UI/Modal/DeleteModal';

import type { DeleteArticlePayload } from '../../../../../app/types/redux.types';

const ArticleMetaActions: FC<{
  authorUsername: string;
  slug: string;
  resourceId: string;
  favoritesCount: number;
}> = (props) => {
  const { authorUsername, slug, resourceId, favoritesCount } = props;

  const dispatch = useAppDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();

  const currentUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);

  const canEdit = currentUser === authorUsername;
  const canDelete = currentUser === authorUsername;

  const showDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const deleteArticleHandler = () => {
    const reqData: DeleteArticlePayload = {
      token: token!,
      resourceId: param.resourceId!,
    };

    dispatch(deleteArticleAsync(reqData));

    setShowDeleteModal(false);

    navigate('/feed', { state: { from: location }, replace: true });
  };

  return (
    <ul className={styles.actions}>
      <li className={styles.item}>
        <FavoriteButton favoritesCount={favoritesCount} />
      </li>
      {canEdit && (
        <li className={styles.item}>
          <EditArticleLink slug={slug} resourceId={resourceId} />
        </li>
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={closeDeleteModalHandler}
          onConfirm={deleteArticleHandler}
        />
      )}
      {canDelete && (
        <li className={styles.item}>
          <DeleteButton onClick={showDeleteModalHandler}>
            Delete Article
          </DeleteButton>
        </li>
      )}
    </ul>
  );
};

export default ArticleMetaActions;
