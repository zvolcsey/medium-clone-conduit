import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './CloseButton.module.css';
import PrimaryButton from './PrimaryButton';

const CloseButton: FC<{ className?: string; onClick: () => void }> = (
  props
) => {
  const { className, onClick } = props;
  return (
    <PrimaryButton
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faXmark} />
      <span>Close</span>
    </PrimaryButton>
  );
};

export default CloseButton;
