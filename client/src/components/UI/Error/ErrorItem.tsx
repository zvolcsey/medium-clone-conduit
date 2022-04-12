import { FC } from 'react';

import styles from './ErrorItem.module.css';

const ErrorItem: FC<{ item: string }> = (props) => {
  const { item } = props;

  return (
    <li className={styles.item}>
      <p className={styles.message}>{item}</p>
    </li>
  );
};

export default ErrorItem;
