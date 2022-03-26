import { FC } from 'react';

import styles from './TabsList.module.css';

const TabsList: FC<{}> = (props) => {
  return <ul className={styles['tabs-list']}>{props.children}</ul>;
};

export default TabsList;
