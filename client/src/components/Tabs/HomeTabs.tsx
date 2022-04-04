import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Tabs from './Tabs';
import TabItem from './TabItem';
import TabsList from './TabsList';

const HomeTabs: FC<{}> = () => {
  const param = useParams();

  return (
    <Tabs>
      <TabsList>
        <TabItem path='/'>Global Feed</TabItem>
        <TabItem path='/feed'>Your Feed</TabItem>
        {param.tagName && (
          <TabItem path={undefined} displayIfActive={true}>
            #{param.tagName}
          </TabItem>
        )}
      </TabsList>
    </Tabs>
  );
};

export default HomeTabs;
