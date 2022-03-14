import { FC } from 'react';

import '../index.css';
import styles from './PageNotFound.module.css';

const PageNotFound: FC<{}> = () => {
  return (
    <div className={`${styles['page-not-found']} centered bold`}>
      404 Page Not Found!
    </div>
  );
};

export default PageNotFound;
