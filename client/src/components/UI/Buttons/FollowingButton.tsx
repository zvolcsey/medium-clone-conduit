import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectToken } from '../../../features/Auth/authSlice';
import {
  followUserAsync,
  unfollowUserAsync,
} from '../../../features/Profile/profileSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

import PrimaryButton from './PrimaryButton';

const FollowingButton: FC<{ username: string; following: boolean }> = (
  props
) => {
  const { username, following } = props;

  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);

  const followingHandler = () => {
    if (token && !following) {
      dispatch(followUserAsync({ token: token, username: username }));
    }
    if (token && following) {
      dispatch(unfollowUserAsync({ token: token, username: username }));
    }
  };

  return (
    <PrimaryButton onClick={followingHandler}>
      {following ? (
        <FontAwesomeIcon icon={faMinus} />
      ) : (
        <FontAwesomeIcon icon={faAdd} />
      )}
      {following ? 'Unfollow' : 'Follow'}
    </PrimaryButton>
  );
};

export default FollowingButton;
