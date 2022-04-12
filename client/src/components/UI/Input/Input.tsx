import { FC } from 'react';
import { InputHookRes } from '../../../app/types/hooks.types';

import styles from './Input.module.css';

const Input: FC<{
  name: string;
  type?: 'text' | 'password';
  required?: boolean;
  onInput: InputHookRes;
}> = (props) => {
  const { name, type, required, onInput } = props;
  const { value, valueChangedHandler } = onInput;

  return (
    <input
      type={type ?? 'text'}
      className={styles.input}
      id={name}
      value={value}
      required={required ?? false}
      onChange={valueChangedHandler}
    />
  );
};

export default Input;
