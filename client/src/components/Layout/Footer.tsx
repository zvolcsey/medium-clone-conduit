import { FC } from 'react';

import styles from './Footer.module.css';
import Brand from '../UI/Brand';

const Footer: FC<{}> = () => {
  return (
    <footer className={styles['main-footer']}>
      <Brand />
    </footer>
  );
};

export default Footer;
