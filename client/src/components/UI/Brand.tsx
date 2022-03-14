import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Brand.module.css';

const Brand: FC<{}> = () => {
  return (
    <Link to='/' className={styles.brand}>
      conduit
    </Link>
  );
};

export default Brand;
