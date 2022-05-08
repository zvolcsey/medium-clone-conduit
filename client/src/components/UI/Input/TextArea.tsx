import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';

import styles from './TextArea.module.css';

const TextArea: FC<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = (props) => {
  return <textarea className={styles.textarea} {...props}></textarea>;
};

export default TextArea;
