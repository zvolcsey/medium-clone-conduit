import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './EditArticleLink.module.css';

const EditArticleLink: FC<{ slug: string; resourceId: string }> = (props) => {
  const { slug, resourceId } = props;

  return (
    <Link to={`/editor/${slug}-${resourceId}`} className={styles.link}>
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </Link>
  );
};

export default EditArticleLink;
