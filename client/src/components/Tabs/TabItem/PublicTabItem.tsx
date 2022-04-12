import { FC } from 'react';

import TabItem from './TabItem';

const PublicTabItem: FC<{
  path: string | undefined;
  displayIfActive?: boolean;
}> = (props) => {
  const { path, displayIfActive, children } = props;

  return (
    <TabItem path={path} displayIfActive={displayIfActive ?? false}>
      {children}
    </TabItem>
  );
};

export default PublicTabItem;
