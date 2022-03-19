import { FC } from 'react';

import TagItem from './TagItem';
import styles from './TagList.module.css';

const TagList: FC<{ tags: string[] }> = (props) => {
  const tagItems = props.tags.map((tag) => <TagItem key={tag} tag={tag} />);

  return <ul className={styles['tag-list']}>{tagItems}</ul>;
};

export default TagList;
