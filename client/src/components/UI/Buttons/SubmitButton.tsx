import { FC } from 'react';

import styles from './SubmitButton.module.css';
import Button from './Button';

const SubmitButton: FC<{ className?: string; disabled?: boolean }> = (
  props
) => {
  const { children, className, disabled } = props;

  return (
    <Button
      type='submit'
      className={`${styles.button} ${className}`}
      onClick={undefined}
      disabled={disabled || false}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
