import { FC } from 'react';
import { Link } from 'react-router-dom';

const TagItem: FC<{ tag: string }> = ({ tag }) => {
  return (
    <li key={tag}>
      <Link to={`/tag/${tag}`}>#{tag}</Link>
    </li>
  );
};

export default TagItem;
