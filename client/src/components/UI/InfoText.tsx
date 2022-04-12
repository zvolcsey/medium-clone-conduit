import { FC } from 'react';

import styles from './InfoText.module.css';

const InfoText: FC<{}> = (props) => {
  const { children } = props;

  return <p className={styles['info-text']}>{children}</p>;
};

export default InfoText;
