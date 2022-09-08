import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectError, setErrorDefault } from './editorSlice';

import styles from './Editor.module.css';
import Card from '../../components/UI/Card';
import EditorForm from './EditorForm';
import Errors from '../../components/UI/Error/Errors';

import type { ArticleProperties } from '../../../../server/src/types/appClasses';

const Editor: FC<{
  article: ArticleProperties | null;
  token: string;
  resourceId?: string;
}> = (props) => {
  const { article, token, resourceId } = props;

  const dispatch = useAppDispatch();

  const errors = useAppSelector(selectError);

  useEffect(() => {
    if (errors) {
      dispatch(setErrorDefault());
    }
  }, []);

  return (
    <Card className={styles.card}>
      <h1 className="centered">
        {resourceId ? 'Edit Article' : 'Create Article'}
      </h1>
      <Errors errors={errors} className={styles.errors} />
      <EditorForm article={article} token={token} resourceId={resourceId} />
    </Card>
  );
};

export default Editor;
