import { FC } from 'react';
import { createPortal } from 'react-dom';

import style from './Backdrop.module.css';

const Backdrop: FC<{ className?: string; onClick: () => void }> = (props) => {
  const { className, onClick } = props;

  return createPortal(
    <div className={`${style.backdrop} ${className}`} onClick={onClick}></div>,
    document.getElementById('backdrop-root')!
  );
};

export default Backdrop;
