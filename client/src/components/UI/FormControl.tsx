import { FC } from 'react';

import styles from './FormControl.module.css';

const FormControl: FC<{ className?: string | undefined }> = (props) => {
  const { className, children } = props;

  return (
    <fieldset className={`${styles.controls} ${className}`}>
      {children}
    </fieldset>
  );
};

export default FormControl;
