import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './EditProfileLink.module.css';

const EditProfileLink: FC<{}> = () => {
  return (
    <Link to={`/settings`} className={styles.link}>
      Edit Profile
    </Link>
  );
};

export default EditProfileLink;
