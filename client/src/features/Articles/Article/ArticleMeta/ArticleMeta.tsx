import { FC } from 'react';

import styles from './ArticleMeta.module.css';
import ArticleInfo from './ArticleInfo';
import ArticleActions from './Actions/ArticleActions';

import type { ArticleMetaData } from '../../../../app/types/components.types';

const ArticleMeta: FC<{
  metaData: ArticleMetaData;
}> = (props) => {
  const {
    createdAt,
    updatedAt,
    slug,
    resourceId,
    favorited,
    favoritesCount,
    authorUsername,
    following,
  } = props.metaData;

  return (
    <div className={styles.meta}>
      <ArticleInfo
        authorUsername={authorUsername}
        following={following}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
      <ArticleActions
        authorUsername={authorUsername}
        slug={slug}
        resourceId={resourceId}
        favorited={favorited}
        favoritesCount={favoritesCount}
      />
    </div>
  );
};

export default ArticleMeta;
