import { FC } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './InputTagItem.module.css';

const InputTagItem: FC<{ tag: string; onRemove: (tag: string) => void }> = (
  props
) => {
  const { tag, onRemove } = props;

  const removeTagHandler = () => {
    onRemove(tag);
  };

  return (
    <li key={tag} className={styles.item}>
      <span onClick={removeTagHandler}>#{tag}</span>
      <FontAwesomeIcon icon={faXmark} />
    </li>
  );
};

export default InputTagItem;
