import { FC } from 'react';

import styles from './FormLabel.module.css';

const FormLabel: FC<{ htmlFor: string; className?: string | undefined }> = (
  props
) => {
  const { htmlFor, className, children } = props;

  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${className}`}>
      {children}
    </label>
  );
};

export default FormLabel;
