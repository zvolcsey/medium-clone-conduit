import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  selectArticles,
  selectArticlesCount,
  selectStatus,
} from '../../features/Articles/articlesListSlice';
import { DEFAULT_ARTICLES_LIMIT } from '../../app/constant';

import '../../index.css';
import styles from './TabPanel.module.css';
import ArticlesList from '../../features/Articles/ArticlesList';
import Loading from '../UI/Loading';
import Pagination from '../../features/Pagination/Pagination';

const TabPanel: FC<{}> = () => {
  const articles = useAppSelector(selectArticles);
  const articlesCount = useAppSelector(selectArticlesCount);
  const status = useAppSelector(selectStatus);

  const [searchParam] = useSearchParams();

  const pageSearchParam = Number(searchParam.get('page')) ?? 1;
  const pages = Math.ceil((articlesCount ?? 0) / DEFAULT_ARTICLES_LIMIT);

  return (
    <section className={styles['tab-panel']}>
      {pageSearchParam <= pages && <Pagination pages={pages} />}
      {status === 'loading' && <Loading />}
      {status === 'success' && <ArticlesList articles={articles} />}
      {status === 'success' && articles.length === 0 && (
        <p className='centered bold'>No articles here... yet!</p>
      )}
      {status === 'failed' && (
        <p className='centered bold'>Loading articles was not successfully!</p>
      )}
      {pageSearchParam > pages &&
        status !== 'loading' &&
        status !== 'failed' && (
          <p className='centered bold'>Page is not exist!</p>
        )}
      {pageSearchParam <= pages && <Pagination pages={pages} />}
    </section>
  );
};

export default TabPanel;
