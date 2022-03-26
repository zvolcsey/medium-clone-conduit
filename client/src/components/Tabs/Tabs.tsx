import { FC } from 'react';

import styles from './Tabs.module.css';
import Card from '../UI/Card';

const Tabs: FC<{}> = (props) => {
  return (
    <nav>
      <Card className={styles['tabs__card']}>{props.children}</Card>
    </nav>
  );
};

export default Tabs;
