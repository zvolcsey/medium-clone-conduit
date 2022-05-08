import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './ArticlePreview.module.css';
import Card from '../../../components/UI/Card';
import TagList from '../../../components/Tags/TagList';
import { ArticleProperties } from '../../../../../server/src/types/appClasses';
import FavoriteButton from '../../../components/UI/Buttons/FavoriteButton';

const ArticlePreview: FC<{ article: ArticleProperties }> = (props) => {
  const { article } = props;

  const createdAtDate = new Date(article.createdAt).toDateString();
  const updatedAtDate = new Date(article.updatedAt).toDateString();
  const isUpdated = new Date(article.updatedAt) > new Date(article.createdAt);

  let tagList = (
    <p className={styles['article-preview__no-hashtag']}>No hashtags</p>
  );

  if (article.tagList.length > 0) {
    tagList = (
      <TagList
        tags={article.tagList}
        className={styles['article-preview__tag-list']}
      />
    );
  }

  return (
    <article className={styles['article-preview']}>
      <Card className={styles['article-preview__card']}>
        <div className={styles['article-meta']}>
          <div className={styles['article-meta__info']}>
            <Link to={`/profile/@${article.author.username}`}>
              {article.author.username}
            </Link>
            <span className={styles['article-meta__date']}>{`${
              isUpdated ? 'Edited: ' : 'Created: '
            }${isUpdated ? updatedAtDate : createdAtDate}`}</span>
          </div>
        </div>
        <h1>{article.title}</h1>
        <p className={styles['article-preview__description']}>
          {article.description}
        </p>
        {tagList}
        <footer className={styles['article-preview__actions']}>
          <Link
            to={`/article/${article.slug}-${article.resourceId}`}
            className={styles['article-preview__link']}
          >
            Read More
          </Link>
          <FavoriteButton
            username={article.author.username}
            resourceId={article.resourceId}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
          />
        </footer>
      </Card>
    </article>
  );
};

export default ArticlePreview;
