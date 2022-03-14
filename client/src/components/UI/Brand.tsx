import { FC } from 'react';
import { Link } from 'react-router-dom';

import '../../index.css';
import styles from './Brand.module.css';

const Brand: FC<{}> = () => {
  return (
    <Link to='/' className={`${styles.brand} bold`}>
      conduit
    </Link>
  );
};

export default Brand;
