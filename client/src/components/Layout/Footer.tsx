import { FC } from 'react';

import styles from './Footer.module.css';
import Brand from '../UI/Brand';
import Container from '../UI/Container';

const Footer: FC<{}> = () => {
  return (
    <footer className={styles['main-footer']}>
      <Container>
        <Brand />
      </Container>
    </footer>
  );
};

export default Footer;
