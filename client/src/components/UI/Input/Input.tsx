import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

const Input: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
