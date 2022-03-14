import { FC } from 'react';

import styles from './Header.module.css';
import Brand from '../UI/Brand';
import Container from '../UI/Container';

const Header: FC<{}> = () => {
  return (
    <header className={styles['main-header']}>
      <Container className={styles['main-header__container']}>
        <Brand />
      </Container>
    </header>
  );
};

export default Header;
