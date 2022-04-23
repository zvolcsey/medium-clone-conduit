import { FC } from 'react';
import { createPortal } from 'react-dom';

import style from './Backdrop.module.css';

const Backdrop: FC<{ onClick: () => void }> = (props) => {
  const { onClick } = props;

  return createPortal(
    <div className={style.backdrop} onClick={onClick}></div>,
    document.getElementById('backdrop-root')!
  );
};

export default Backdrop;
