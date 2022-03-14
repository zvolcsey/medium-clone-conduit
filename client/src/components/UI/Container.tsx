import { FC } from 'react';

import styles from './Container.module.css';

const Container: FC<{ className?: string }> = (props) => {
  return (
    <div className={`${styles.container} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};

export default Container;
