import { FC } from 'react';

import styles from './DeleteModal.module.css';
import Card from '../Card';
import Button from '../Button';
import Modal from './Modal';

const DeleteModal: FC<{
  onClose: () => void;
  onConfirm: () => void;
}> = (props) => {
  const { onClose, onConfirm } = props;

  return (
    <Modal onBackdropClick={onClose}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Are you sure?</h1>
        <footer className={styles.actions}>
          <Button className={styles['button--close']} onClick={onClose}>
            No
          </Button>
          <Button className={styles['button--confirm']} onClick={onConfirm}>
            Yes
          </Button>
        </footer>
      </Card>
    </Modal>
  );
};

export default DeleteModal;
