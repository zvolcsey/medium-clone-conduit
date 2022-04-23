import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './EditArticleLink.module.css';

const EditArticleLink: FC<{ slug: string; resourceId: string }> = (props) => {
  const { slug, resourceId } = props;

  return (
    <Link to={`/editor/${slug}-${resourceId}`} className={styles.link}>
      Edit Article
    </Link>
  );
};

export default EditArticleLink;
