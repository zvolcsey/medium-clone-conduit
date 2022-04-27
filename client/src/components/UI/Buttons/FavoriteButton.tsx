import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  favoriteArticleAsync,
  unfavoriteArticleAsync,
} from '../../../features/Articles/Article/articleSlice';
import {
  selectCurrentUser,
  selectToken,
} from '../../../features/Auth/authSlice';

import styles from './FavoriteButton.module.css';
import PrimaryButton from './PrimaryButton';

const FavoriteButton: FC<{
  username: string;
  resourceId: string;
  favorited: boolean;
  favoritesCount: number;
}> = (props) => {
  const { username, resourceId, favorited, favoritesCount } = props;

  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectCurrentUser);

  const isYou = currentUser === username;

  const favoriteHandler = () => {
    if (token && !favorited && !isYou) {
      dispatch(favoriteArticleAsync({ token: token, resourceId: resourceId }));
    }
    if (token && favorited && !isYou) {
      dispatch(
        unfavoriteArticleAsync({ token: token, resourceId: resourceId })
      );
    }
  };

  return (
    <PrimaryButton
      className={`${styles.button} ${favorited && styles.favorited}`}
      onClick={favoriteHandler}
    >
      Favorite <span>{favoritesCount}</span>
    </PrimaryButton>
  );
};

export default FavoriteButton;
