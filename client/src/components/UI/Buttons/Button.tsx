import { FC } from 'react';
import { ButtonType } from '../../../app/types/components.types';

import styles from './Button.module.css';

const Button: FC<{
  type?: ButtonType;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={`${styles.button} ${props.className || ''}`}
      onClick={props.type !== 'submit' ? props.onClick : undefined}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
