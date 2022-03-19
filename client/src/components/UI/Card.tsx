import { FC } from 'react';

import styles from './Card.module.css';

const Card: FC<{ className?: string }> = (props) => {
  return (
    <div className={`${styles.card} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};

export default Card;
