import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './SubmitButton.module.css';
import Button from './Button';

const SubmitButton: FC<{ className?: string; disabled?: boolean }> = (
  props
) => {
  const { children, className, disabled } = props;

  return (
    <Button
      type="submit"
      className={`${styles.button} ${className}`}
      onClick={undefined}
      disabled={disabled || false}
    >
      {children}&nbsp;
      <FontAwesomeIcon icon={faChevronRight} />
    </Button>
  );
};

export default SubmitButton;
