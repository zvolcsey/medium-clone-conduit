import { FC } from 'react';

import '../../index.css';
import styles from './Header.module.css';
import Brand from '../Brand/Brand';
import Container from '../UI/Container';
import MenuButton from '../UI/Buttons/MenuButton';
import NavList from './NavList';

const Header: FC<{ onHamburgerButtonClick: () => void }> = (props) => {
  const { onHamburgerButtonClick } = props;

  return (
    <header className={styles['main-header']}>
      <Container className={styles.container}>
        <Brand />
        <nav aria-labelledby={`main-navigation`} className={styles.nav}>
          <NavList id='main-navigation' className={styles['nav-list']} />
        </nav>
        <MenuButton onClick={onHamburgerButtonClick} />
      </Container>
    </header>
  );
};

export default Header;
