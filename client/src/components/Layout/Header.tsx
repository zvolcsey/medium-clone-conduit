import { FC } from 'react';

import styles from './Header.module.css';
import Brand from '../UI/Brand';

const Header: FC<{}> = () => {
  return (
    <header className={styles['main-header']}>
      <Brand />
    </header>
  );
};

export default Header;
