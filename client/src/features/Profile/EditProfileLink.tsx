import { FC } from 'react';
import { Link } from 'react-router-dom';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './EditProfileLink.module.css';

const EditProfileLink: FC<{}> = () => {
  return (
    <Link to={`/settings`} className={styles.link}>
      <FontAwesomeIcon icon={faEdit} />
      Edit Profile
    </Link>
  );
};

export default EditProfileLink;
