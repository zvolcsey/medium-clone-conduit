import { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectToken } from '../../../features/Auth/authSlice';

import TabItem from './TabItem';

const PrivateTabItem: FC<{
  path: string | undefined;
  displayIfActive?: boolean;
}> = (props) => {
  const { path, displayIfActive, children } = props;

  const token = useAppSelector(selectToken);

  if (!token) {
    return null;
  }

  return (
    <TabItem path={path} displayIfActive={displayIfActive ?? false}>
      {children}
    </TabItem>
  );
};

export default PrivateTabItem;
