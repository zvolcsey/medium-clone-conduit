import { FC } from 'react';

import styles from './FavoriteButton.module.css';
import Button from './Button';

const FavoriteButton: FC<{ favoritesCount: number }> = (props) => {
  const { favoritesCount } = props;

  const favoriteHandler = () => {
    //TODO: favorite functionality
    return;
  };

  return (
    <Button className={styles['favorite-button']} onClick={favoriteHandler}>
      Favorite <span>{favoritesCount}</span>
    </Button>
  );
};

export default FavoriteButton;
