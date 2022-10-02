import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectAppName } from '../app/common-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  articlePageUnload,
  initArticleAsync,
  selectArticle,
  selectArticleStatus,
} from '../features/Articles/Article/articleSlice';
import { selectToken } from '../features/Auth/authSlice';

import '../index.css';
import styles from './ArticlePage.module.css';
import Article from '../features/Articles/Article/Article';
import Loading from '../components/UI/Loading';

const ArticlePage: FC<{}> = () => {
  const dispatch = useAppDispatch();

  const appName = useAppSelector(selectAppName);
  const token = useAppSelector(selectToken);
  const article = useAppSelector(selectArticle);
  const status = useAppSelector(selectArticleStatus);

  const param = useParams();
  const resourceId = param.resourceId!;

  useEffect(() => {
    document.title = `${article?.title ?? 'Article Page'} | ${appName}`;
  }, [article?.title, appName]);

  useEffect(() => {
    if (!article) {
      dispatch(initArticleAsync({ token, resourceId }));
    }
  }, [dispatch, token, resourceId, article]);

  useEffect(() => {
    return () => {
      dispatch(articlePageUnload());
    };
  }, [dispatch]);

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'success' && <Article article={article!} />}
      {status === 'failed' && (
        <p className={`${styles.error} centered bold`}>
          Loading Article was not successfully
        </p>
      )}
    </>
  );
};

export default ArticlePage;
