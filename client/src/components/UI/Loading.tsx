import { FC } from 'react';

import '../../index.css';
import styles from './Loading.module.css';

const Loading: FC<{}> = () => {
  return <p className={`${styles.loading} centered bold`}>Loading...</p>;
};

export default Loading;
