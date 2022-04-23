import { FC } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';
import Backdrop from '../Backdrop';

const Modal: FC<{ onBackdropClick: () => void }> = (props) => {
  const { onBackdropClick, children } = props;

  return (
    <>
      <Backdrop onClick={onBackdropClick} />
      {createPortal(
        <div className={styles.modal}>{children}</div>,
        document.getElementById('overlay-root')!
      )}
    </>
  );
};

export default Modal;
