import { FC } from 'react';

import styles from './ErrorsList.module.css';
import ErrorItem from './ErrorItem';
import type { InputValidation } from '../../../../../server/src/types/appResponse.types';

const ErrorsList: FC<{ items: string | InputValidation[] }> = (props) => {
  const { items } = props;

  let errorItems;
  if (typeof items === 'string') {
    errorItems = <ErrorItem item={items} />;
  } else {
    errorItems = items.map((item) => (
      <ErrorItem key={item.id} item={item.text} />
    ));
  }

  return <ul className={styles['errors-list']}>{errorItems}</ul>;
};

export default ErrorsList;
