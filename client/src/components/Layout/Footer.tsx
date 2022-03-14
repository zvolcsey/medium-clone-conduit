import { FC } from 'react';

import styles from './Footer.module.css';
import Brand from '../UI/Brand';
import Container from '../UI/Container';

const Footer: FC<{}> = () => {
  return (
    <footer className={styles['main-footer']}>
      <Container>
        <Brand />
        <span className={styles.attribution}>
          An interactive learning project from{' '}
          <a target='_blank' href='https://thinkster.io'>
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
