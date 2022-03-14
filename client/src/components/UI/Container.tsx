import { FC } from 'react';

import styles from './Container.module.css';

const Container: FC<{}> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container;
