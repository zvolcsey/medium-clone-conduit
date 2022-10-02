import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  selectArticles,
  selectArticlesCount,
  selectStatus,
} from '../../features/Articles/ArticlesList/articlesListSlice';
import { DEFAULT_ARTICLES_LIMIT } from '../../app/constant';

import '../../index.css';
import styles from './TabPanel.module.css';
import ArticlesList from '../../features/Articles/ArticlesList/ArticlesList';
import Loading from '../UI/Loading';
import Pagination from '../../features/Pagination/Pagination';

const TabPanel: FC<{}> = () => {
  const articles = useAppSelector(selectArticles);
  const articlesCount = useAppSelector(selectArticlesCount);
  const status = useAppSelector(selectStatus);

  const [searchParam] = useSearchParams();

  const pageSearchParam = searchParam.get('page') ?? 1;

  const pages =
    Math.ceil((articlesCount ?? 0) / DEFAULT_ARTICLES_LIMIT) === 0
      ? 1
      : Math.ceil((articlesCount ?? 0) / DEFAULT_ARTICLES_LIMIT);

  const pageIsExist =
    Number(pageSearchParam) >= 1 && Number(pageSearchParam) <= pages;

  let content = <Loading />;

  if (status === 'success' && articlesCount! > 0) {
    content = <ArticlesList articles={articles} />;
  }

  if (status === 'success' && articlesCount === 0) {
    content = <p className="centered bold">No articles here... yet!</p>;
  }

  if (status === 'failed') {
    content = (
      <p className="centered bold">Loading articles was not successfully!</p>
    );
  }

  if (!pageIsExist) {
    content = <p className="centered bold">Page is not exist!</p>;
  }

  return (
    <section className={styles['tab-panel']}>
      {pageIsExist && <Pagination pages={pages} />}
      {content}
      {pageIsExist && <Pagination pages={pages} />}
    </section>
  );
};

export default TabPanel;
