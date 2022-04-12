import { FC } from 'react';

import styles from './Errors.module.css';
import ErrorsList from './ErrorsList';

import type { ErrorResBody } from '../../../../../server/src/types/appResponse.types';

const Errors: FC<{ errors?: ErrorResBody; className?: string }> = (props) => {
  const { errors, className } = props;

  if (!errors) {
    return null;
  }

  return (
    <div className={`${styles.errors} ${className}`}>
      <h2>{errors.body[0].name}:</h2>
      <ErrorsList items={errors.body[0].message} />
    </div>
  );
};

export default Errors;
