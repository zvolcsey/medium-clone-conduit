import { FC } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { ArticleProperties } from '../../../../../server/src/types/appClasses';

import styles from './Article.module.css';
import Card from '../../../components/UI/Card';
import Container from '../../../components/UI/Container';
import Comments from './Comments/Comments';
import TagList from '../../../components/Tags/TagList';
import ArticleMeta from './ArticleMeta/ArticleMeta';

import { ArticleMetaData } from '../../../app/types/components.types';

const Article: FC<{ article: ArticleProperties }> = (props) => {
  const { article } = props;

  const location = useLocation();

  const articleMetaData: ArticleMetaData = {
    authorUsername: article.author.username,
    following: article.author.following,
    createdAt: article.createdAt,
    slug: article.slug,
    resourceId: article.resourceId,
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
  };

  const loadCommentsLink = (
    <Link
      to={`${location.pathname}/comments`}
      className={styles['load-comments-link']}
    >
      Load Comments
    </Link>
  );

  return (
    <article>
      <Container className={styles['title-container']}>
        <h1>{article.title}</h1>
      </Container>
      <ArticleMeta metaData={articleMetaData} />
      <Card className={styles['body-card']}>
        <p>The body of the article.</p>
        <TagList tags={article.tagList} className={styles['tag-list']} />
      </Card>
      <ArticleMeta metaData={articleMetaData} />
      <Routes>
        <Route path='/' element={loadCommentsLink} />
        <Route
          path='comments'
          element={<Comments articleResourceId={article.resourceId} />}
        />
      </Routes>
    </article>
  );
};

export default Article;
