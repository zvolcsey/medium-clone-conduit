import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Tabs from './Tabs';
import PublicTabItem from './TabItem/PublicTabItem';
import TabsList from './TabsList';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/Auth/authSlice';

const ProfileTab: FC<{ username: string | undefined }> = (props) => {
  const { username } = props;

  const currentUser = useAppSelector(selectCurrentUser);

  const currentUserProfile = currentUser === username;

  return (
    <Tabs>
      <TabsList>
        <PublicTabItem path={`/profile/@${username}`}>
          {currentUserProfile ? 'My Articles' : `${username}'s Articles`}
        </PublicTabItem>
        <PublicTabItem path={`/profile/@${username}/favorites`}>
          Favorited Articles
        </PublicTabItem>
      </TabsList>
    </Tabs>
  );
};

export default ProfileTab;
