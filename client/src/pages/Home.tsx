import { FC, useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  articlesUnload,
  initFeedArticlesAsync,
  initGlobalArticlesAsync,
} from '../features/Articles/ArticlesList/articlesListSlice';
import { initPopularTagsAsync } from '../features/PopularTags/popularTagsSlice';
import { initTagFilterArticlesAsync } from '../features/Articles/ArticlesList/articlesListSlice';
import { setCurrentPage } from '../features/Pagination/paginationSlice';
import { selectToken } from '../features/Auth/authSlice';
import { selectAppName } from '../app/common-slice';
import {
  DEFAULT_ARTICLES_LIMIT,
  DEFAULT_ARTICLES_OFFSET,
} from '../app/constant';

import Banner from '../components/Banner/Banner';
import PopularTags from '../features/PopularTags/PopularTags';
import HomeTabs from '../components/Tabs/HomeTabs';
import TabPanel from '../components/Tabs/TabPanel';

const Home: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const param = useParams();
  const [searchParams] = useSearchParams();

  const token = useAppSelector(selectToken);
  const appName = useAppSelector(selectAppName);

  const pageSearchParam =
    Number(searchParams.get('page')) === 0
      ? 1
      : Number(searchParams.get('page'));
  const articlesOffset =
    pageSearchParam === 1
      ? DEFAULT_ARTICLES_OFFSET
      : pageSearchParam * DEFAULT_ARTICLES_LIMIT - DEFAULT_ARTICLES_LIMIT;

  useEffect(() => {
    document.title = `Home | ${appName}`;
  }, [appName]);

  useEffect(() => {
    dispatch(setCurrentPage(pageSearchParam));
    dispatch(initPopularTagsAsync());
    if (location.pathname === '/') {
      dispatch(
        initGlobalArticlesAsync({
          limit: DEFAULT_ARTICLES_LIMIT,
          offset: articlesOffset,
          token: token,
        })
      );
    }
    if (location.pathname === '/feed' && token) {
      dispatch(
        initFeedArticlesAsync({
          limit: DEFAULT_ARTICLES_LIMIT,
          offset: articlesOffset,
          token: token,
        })
      );
    }
    if (param.tagName) {
      dispatch(
        initTagFilterArticlesAsync({
          limit: DEFAULT_ARTICLES_LIMIT,
          offset: articlesOffset,
          token: token,
          tag: param.tagName,
        })
      );
    }
    return () => {
      dispatch(articlesUnload());
    };
  }, [
    dispatch,
    location.pathname,
    param.tagName,
    pageSearchParam,
    articlesOffset,
    token,
  ]);

  return (
    <>
      <Banner />
      <PopularTags />
      <HomeTabs />
      <TabPanel />
    </>
  );
};

export default Home;
