import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectAppName } from '../app/common-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { selectCurrentUser, selectToken } from '../features/Auth/authSlice';
import {
  editorPageUnload,
  initEditedArticleAsync,
  selectArticle,
  selectArticleStatus,
} from '../features/Editor/editorSlice';

import '../index.css';
import styles from './EditorPage.module.css';
import Editor from '../features/Editor/Editor';
import Loading from '../components/UI/Loading';

const EditorPage: FC<{}> = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const resourceId = params.resourceId;

  const appName = useAppSelector(selectAppName);
  const token = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const article = useAppSelector(selectArticle);
  const articleStatus = useAppSelector(selectArticleStatus);

  const isYourArticle = article?.author.username === currentUser;

  useEffect(() => {
    document.title = `${
      resourceId ? 'Edit Article' : 'Create Article'
    } | ${appName}`;
  }, [resourceId, appName]);

  useEffect(() => {
    if (resourceId) {
      dispatch(initEditedArticleAsync({ token, resourceId }));
    }
  }, [dispatch, token, resourceId]);

  useEffect(() => {
    return () => {
      dispatch(editorPageUnload());
    };
  }, [dispatch]);

  return (
    <>
      {articleStatus === 'loading' && <Loading />}
      {!resourceId && (
        <Editor article={null} token={token!} resourceId={resourceId} />
      )}
      {resourceId &&
        article &&
        articleStatus === 'success' &&
        isYourArticle && (
          <Editor article={article} token={token!} resourceId={resourceId} />
        )}
      {resourceId && !isYourArticle && (
        <p className={`${styles.message} centered bold`}>
          It is not your article!
        </p>
      )}
      {articleStatus === 'failed' && (
        <p className={`${styles.error} centered bold`}>
          Loading Article was not successfully
        </p>
      )}
    </>
  );
};

export default EditorPage;
