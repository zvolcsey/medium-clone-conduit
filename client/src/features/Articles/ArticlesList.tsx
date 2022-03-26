import { FC } from 'react';
import { ArticleProperties } from '../../../../server/src/types/appClasses';
import ArticlePreview from './ArticlePreview';

const ArticlesList: FC<{ articles: ArticleProperties[] }> = (props) => (
  <ul>
    {props.articles.map((article) => (
      <ArticlePreview key={article.resourceId} article={article} />
    ))}
  </ul>
);

export default ArticlesList;
