import { FC } from 'react';

import '../../index.css';
import styles from './Profile.module.css';
import Container from '../../components/UI/Container';
import ProfileActions from './ProfileActions';
import Card from '../../components/UI/Card';
import { ProfileProperties } from '../../../../server/src/types/appClasses';

const Profile: FC<{ profile: ProfileProperties }> = (props) => {
  const { profile } = props;

  let bio = <p className='centered italic'>No biography</p>;

  if (profile.bio) {
    bio = <p>{profile.bio}</p>;
  }

  return (
    <section>
      <Container className={styles['username-container']}>
        <h1>{profile.username}</h1>
      </Container>
      <Container className={styles['actions-container']}>
        <ProfileActions username={profile.username} />
      </Container>
      <Card className={styles.card}>{bio}</Card>
      <Container className={styles['actions-container']}>
        <ProfileActions username={profile.username} />
      </Container>
    </section>
  );
};

export default Profile;
