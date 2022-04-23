import {
  ArticleProperties,
  CommentProperties,
} from '../../../../server/src/types/appClasses';
import { CommentReqBody } from '../../../../server/src/types/appRequest.types';
import { ErrorResBody } from '../../../../server/src/types/appResponse.types';

export type Status = 'idle' | 'loading' | 'success' | 'failed';

export interface CommonState {
  appName: string;
  appSlogan: string;
}

export interface PopularTagsState {
  tags: string[];
  status: Status;
}

export interface ArticlesListState {
  articles: ArticleProperties[];
  articlesCount: number | null;
  status: Status;
}

export interface MultipleArticlesReqBody {
  limit?: number;
  offset?: number;
}

export interface MultipleFeedArticlesReqBody extends MultipleArticlesReqBody {
  token: string;
}

export interface MultipleTagFilterArticlesReqBody
  extends MultipleArticlesReqBody {
  tag: string;
}

export interface ArticleState {
  article: ArticleProperties | null;
  articleStatus: Status;
  deleteStatus: Status;
}

export interface InitArticlePayload {
  token: string | null;
  resourceId: string;
}

export interface DeleteArticlePayload {
  token: string | null;
  resourceId: string;
}

export interface CommentState {
  status: Status;
}

export interface CommentsListState {
  comments: CommentProperties[];
  status: Status;
}

export interface NewCommentState {
  status: Status;
  errors: ErrorResBody | undefined;
}

export interface MultipleCommentsPayload {
  token: string | null;
  articleResourceId: string;
}

export interface CreateCommentPayload {
  token: string;
  articleResourceId: string;
  reqData: CommentReqBody;
}

export interface DeleteCommentPayload {
  token: string;
  articleResourceId: string;
  commentResourceId: string;
}

export interface PaginationState {
  currentPage: number;
}

export interface AuthState {
  token: string | null;
  currentUser: string | null;
  error: ErrorResBody | undefined;
  status: Status;
}
