import { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  initGlobalArticlesAsync,
  selectFeedArticles,
  selectFeedArticlesStatus,
  selectGlobalArticles,
  selectGlobalArticlesStatus,
  selectTagFilterArticles,
  selectTagFilterArticlesStatus,
} from '../features/Articles/articlesListSlice';
import { initPopularTagsAsync } from '../features/PopularTags/popularTagsSlice';
import { initTagFilterArticlesAsync } from '../features/Articles/articlesListSlice';

import Banner from '../components/Banner/Banner';
import PopularTags from '../features/PopularTags/PopularTags';
import Tabs from '../components/Tabs/Tabs';
import TabItem from '../components/Tabs/TabItem';
import TabsList from '../components/Tabs/TabsList';
import TabPanel from '../components/Tabs/TabPanel';

const Home: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const param = useParams();

  const globalArticles = useAppSelector(selectGlobalArticles);
  const globalArticlesStatus = useAppSelector(selectGlobalArticlesStatus);
  const feedArticles = useAppSelector(selectFeedArticles);
  const feedArticlesStatus = useAppSelector(selectFeedArticlesStatus);
  const tagFilterArticles = useAppSelector(selectTagFilterArticles);
  const tagFilterArticlesStatus = useAppSelector(selectTagFilterArticlesStatus);

  useEffect(() => {
    if (param.tagName)
      dispatch(initTagFilterArticlesAsync({ tag: param.tagName }));
  }, [param.tagName, dispatch]);

  useEffect(() => {
    dispatch(initPopularTagsAsync());
    dispatch(initGlobalArticlesAsync({}));
  }, [dispatch]);

  return (
    <>
      <Banner />
      <PopularTags />
      <Tabs>
        <TabsList>
          <TabItem path='/'>Global Feed</TabItem>
          <TabItem path='/feed'>Your Feed</TabItem>
          {param.tagName && (
            <TabItem path={`/tag/${param.tagName}`} displayIfActive={true}>
              #{param.tagName}
            </TabItem>
          )}
        </TabsList>
      </Tabs>
      {location.pathname === '/' && location.search.length === 0 && (
        <TabPanel items={globalArticles} status={globalArticlesStatus} />
      )}
      {location.pathname === '/feed' && (
        <TabPanel items={feedArticles} status={feedArticlesStatus} />
      )}
      {param.tagName && (
        <TabPanel items={tagFilterArticles} status={tagFilterArticlesStatus} />
      )}
    </>
  );
};

export default Home;
