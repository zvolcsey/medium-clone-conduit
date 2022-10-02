import { FC } from 'react';

import styles from './InputTagList.module.css';
import TagSpanItem from './InputTagItem';

const InputTagList: FC<{
  tags: string[];
  className?: string;
  onRemoveTag?: (tag: string) => void;
}> = (props) => {
  const { tags, className, onRemoveTag } = props;

  const removeTagHandler = (tag: string) => {
    onRemoveTag!(tag);
  };

  const tagItems = tags.map((tag) => (
    <TagSpanItem key={tag} tag={tag} onRemove={removeTagHandler} />
  ));

  return (
    <ul className={`${styles['tag-list']} ${className ?? ''}`}>{tagItems}</ul>
  );
};

export default InputTagList;
