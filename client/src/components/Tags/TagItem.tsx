import { FC } from 'react';
import { Link } from 'react-router-dom';

const TagItem: FC<{ tag: string }> = (props) => {
  const { tag } = props;

  return (
    <li key={tag}>
      <Link to={`/tag/${tag}`}>#{tag}</Link>
    </li>
  );
};

export default TagItem;
