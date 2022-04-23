import {
  UserProperties,
  ArticleProperties,
  ProfileProperties,
  CommentProperties,
} from './appClasses';

export interface UserResBody {
  user: UserProperties;
}

export interface ProfileResBody {
  profile: ProfileProperties;
}

export interface SingleArticleResBody {
  article: ArticleProperties;
}

export interface MultipleArticlesResBody {
  articles: ArticleProperties[];
  articlesCount: number;
}

export interface SingleCommentResBody {
  comment: CommentProperties;
}

export interface MultipleCommentsResBody {
  comments: CommentProperties[];
  commentsCount: number;
}

export interface PopularTagsResBody {
  tags: string[];
}

export interface ErrorResBody {
  body: ErrorResBodyProperties[];
}

export interface ErrorResBodyProperties {
  id: string;
  name: string;
  message: string | InputValidation[];
}

export interface InputValidation {
  id: string;
  text: string;
}
