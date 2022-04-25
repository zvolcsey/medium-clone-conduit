import { FC } from 'react';

import styles from './FavoriteButton.module.css';
import PrimaryButton from './PrimaryButton';

const FavoriteButton: FC<{ favoritesCount: number }> = (props) => {
  const { favoritesCount } = props;

  const favoriteHandler = () => {
    //TODO: favorite functionality
    return;
  };

  return (
    <PrimaryButton className={styles.button} onClick={favoriteHandler}>
      Favorite <span>{favoritesCount}</span>
    </PrimaryButton>
  );
};

export default FavoriteButton;
