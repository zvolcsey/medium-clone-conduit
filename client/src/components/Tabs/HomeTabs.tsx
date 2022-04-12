import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Tabs from './Tabs';
import PublicTabItem from './TabItem/PublicTabItem';
import PrivateTabItem from './TabItem/PrivateTabItem';
import TabsList from './TabsList';

const HomeTabs: FC<{}> = () => {
  const param = useParams();

  return (
    <Tabs>
      <TabsList>
        <PublicTabItem path='/'>Global Feed</PublicTabItem>
        <PrivateTabItem path='/feed'>Your Feed</PrivateTabItem>
        {param.tagName && (
          <PublicTabItem path={undefined} displayIfActive={true}>
            #{param.tagName}
          </PublicTabItem>
        )}
      </TabsList>
    </Tabs>
  );
};

export default HomeTabs;
