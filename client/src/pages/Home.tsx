import { FC, useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
  articlesUnload,
  initGlobalArticlesAsync,
} from '../features/Articles/articlesListSlice';
import { initPopularTagsAsync } from '../features/PopularTags/popularTagsSlice';
import { initTagFilterArticlesAsync } from '../features/Articles/articlesListSlice';
import { setCurrentPage } from '../features/Pagination/paginationSlice';
import { DEFAULT_ARTICLES_LIMIT } from '../app/constant';

import Banner from '../components/Banner/Banner';
import PopularTags from '../features/PopularTags/PopularTags';
import HomeTabs from '../components/Tabs/HomeTabs';
import TabPanel from '../components/Tabs/TabPanel';

const Home: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const param = useParams();
  const [searchParams] = useSearchParams();

  const pageSearchParam =
    Number(searchParams.get('page')) === 0
      ? 1
      : Number(searchParams.get('page'));
  const articlesOffset =
    pageSearchParam === 1
      ? 0
      : pageSearchParam * DEFAULT_ARTICLES_LIMIT - DEFAULT_ARTICLES_LIMIT;

  useEffect(() => {
    dispatch(setCurrentPage(pageSearchParam));
    dispatch(initPopularTagsAsync());
    if (location.pathname === '/') {
      dispatch(
        initGlobalArticlesAsync({
          limit: DEFAULT_ARTICLES_LIMIT,
          offset: articlesOffset,
        })
      );
    }
    if (location.pathname === '/feed') {
      //TODO
    }
    if (param.tagName) {
      dispatch(
        initTagFilterArticlesAsync({
          limit: DEFAULT_ARTICLES_LIMIT,
          offset: articlesOffset,
          tag: param.tagName,
        })
      );
    }
    return () => {
      dispatch(articlesUnload());
    };
  }, [dispatch, location.pathname, param.tagName, pageSearchParam]);

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
