import { FC } from 'react';
import { Link } from 'react-router-dom';
import { selectAppName } from '../../app/common-slice';
import { useAppSelector } from '../../app/hooks';

import '../../index.css';
import styles from './Brand.module.css';

const Brand: FC<{}> = () => {
  const appName = useAppSelector(selectAppName);

  return (
    <Link to='/' className={`${styles.brand} bold`}>
      {appName.toLowerCase()}
    </Link>
  );
};

export default Brand;
