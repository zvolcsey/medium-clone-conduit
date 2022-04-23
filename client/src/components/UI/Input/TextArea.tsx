import { FC } from 'react';

import styles from './TextArea.module.css';

import type { InputHookRes } from '../../../app/types/hooks.types';

const TextArea: FC<{
  name: string;
  rows: number;
  cols: number;
  required?: boolean;
  onInput: InputHookRes;
}> = (props) => {
  const { value, valueChangedHandler } = props.onInput;
  const { name, required, rows, cols } = props;

  return (
    <textarea
      name={name}
      rows={rows}
      cols={cols}
      required={required ?? undefined}
      value={value}
      onChange={valueChangedHandler}
      className={styles.textarea}
    ></textarea>
  );
};

export default TextArea;
