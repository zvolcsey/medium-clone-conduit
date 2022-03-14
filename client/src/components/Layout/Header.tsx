import { FC } from 'react';

import '../../index.css';
import styles from './Header.module.css';
import Brand from '../UI/Brand';
import Container from '../UI/Container';
import { NavLink } from 'react-router-dom';

const Header: FC<{}> = () => {
  return (
    <header className={styles['main-header']}>
      <Container className={styles['main-header__container']}>
        <Brand />
        <nav aria-labelledby='main-navigation' className={styles['main-nav']}>
          <ul id='main-navgation' className={styles['main-nav__items']}>
            <li className={`${styles['main-nav__item']} bold`}>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? styles['main-nav__item--active'] : undefined
                }
              >
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
