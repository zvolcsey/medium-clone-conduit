import { FC } from 'react';

import styles from './DeleteButton.module.css';
import PrimaryButton from './PrimaryButton';

const DeleteButton: FC<{ onClick: () => void }> = (props) => {
  const { onClick, children } = props;

  return (
    <PrimaryButton className={styles.button} onClick={onClick}>
      {children}
    </PrimaryButton>
  );
};

export default DeleteButton;
