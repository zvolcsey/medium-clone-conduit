import { FC } from 'react';

import PrimaryButton from './PrimaryButton';

const FollowingButton: FC<{ following: boolean }> = (props) => {
  const { following } = props;

  const followingHandler = () => {
    //TODO
    return;
  };

  return (
    <PrimaryButton onClick={followingHandler}>
      {following ? 'Unfollow' : 'Follow'}
    </PrimaryButton>
  );
};

export default FollowingButton;
