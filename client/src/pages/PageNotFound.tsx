import { FC } from 'react';
import { Link } from 'react-router-dom';

import '../index.css';
import styles from './PageNotFound.module.css';

const PageNotFound: FC<{}> = () => {
  return (
    <section className={`${styles['page-not-found']} centered`}>
      <h1 className={`${styles['page-not-found__title']}`}>
        404 Page Not Found!
      </h1>
      <Link to='/'>Back to Home</Link>
    </section>
  );
};

export default PageNotFound;
