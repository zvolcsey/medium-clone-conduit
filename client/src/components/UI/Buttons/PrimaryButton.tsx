import { FC } from 'react';

import styles from './PrimaryButton.module.css';
import Button from './Button';

const PrimaryButton: FC<{
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}> = (props) => {
  const { className, onClick, children } = props;

  return (
    <Button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={props.disabled || false}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
