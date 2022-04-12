import { ArticleProperties } from '../../../../server/src/types/appClasses';
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

export interface PaginationState {
  currentPage: number;
}

export interface AuthState {
  token: string | null;
  currentUser: string | null;
  error: ErrorResBody | undefined;
  status: Status;
}
