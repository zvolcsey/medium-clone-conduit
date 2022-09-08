import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeTag, selectTags } from '../../../features/Editor/editorSlice';
import { MAX_ARTICLES_HASHTAGS } from '../../../app/constant';

import styles from './TagsInput.module.css';
import InputTagList from '../../Tags/InputTagList';

const TagsInput: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(selectTags);
  const maximumTag = tags.length === MAX_ARTICLES_HASHTAGS;

  const removeTagHandler = (tag: string) => {
    dispatch(removeTag(tag));
  };

  return (
    <div className={styles['input-container']}>
      <InputTagList tags={tags} onRemoveTag={removeTagHandler} />
      {!maximumTag && <input type="text" className={styles.input} {...props} />}
    </div>
  );
};

export default TagsInput;
