import { FC } from 'react';
import { createPortal } from 'react-dom';

import styles from './SideDrawer.module.css';
import Backdrop from '../UI/Backdrop';
import Brand from '../Brand/Brand';
import CloseButton from '../UI/Buttons/CloseButton';
import NavList from './NavList';

const SideDrawer: FC<{
  show: boolean;
  onClose: () => void;
}> = (props) => {
  const { show, onClose } = props;

  if (!show) {
    return null;
  }

  return (
    <>
      <Backdrop onClick={onClose} className={styles.backdrop} />
      {createPortal(
        <div className={styles['side-drawer']}>
          <header>
            <Brand />
            <CloseButton onClick={onClose} className={styles['close-button']} />
          </header>
          <nav
            aria-labelledby={`side-drawer-navigation`}
            className={styles.nav}
          >
            <NavList
              id='side-drawer-navigation'
              className={styles['nav-list']}
              onItemClick={onClose}
            />
          </nav>
        </div>,
        document.getElementById('overlay-root')!
      )}
    </>
  );
};

export default SideDrawer;
