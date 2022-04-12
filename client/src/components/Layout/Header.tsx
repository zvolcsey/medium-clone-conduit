import { FC } from 'react';

import '../../index.css';
import styles from './Header.module.css';
import Brand from '../Brand/Brand';
import Container from '../UI/Container';
import MainNav from './MainNav';

const Header: FC<{}> = () => {
  return (
    <header className={styles['main-header']}>
      <Container className={styles.container}>
        <Brand />
        <MainNav />
      </Container>
    </header>
  );
};

export default Header;
