import { FC } from 'react';

import '../../index.css';
import styles from './Footer.module.css';
import Brand from '../UI/Brand';
import Container from '../UI/Container';

const Footer: FC<{}> = () => {
  return (
    <footer className={styles['main-footer']}>
      <Container className={styles['main-footer__container']}>
        <Brand />
        <span className={styles.attribution}>
          An interactive learning project from{' '}
          <a target='_blank' href='https://thinkster.io' className='bold'>
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
