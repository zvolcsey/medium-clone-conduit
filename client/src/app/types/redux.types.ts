import { ArticleProperties } from '../../../../server/src/types/appClasses';

export type Status = 'idle' | 'loading' | 'success' | 'failed';

export interface CommonState {
  appName: string;
  appSlogan: string;
}

export interface PopularTagsState {
  tags: string[];
  status: Status;
}

export interface ArticlesState {
  globalArticles: ArticleProperties[];
  feedArticles: ArticleProperties[];
  tagFilterArticles: ArticleProperties[];
  globalArticlesCount: number;
  feedArticlesCount: number;
  tagFilterArticlesCount: number;
  globalArticlesStatus: Status;
  feedArticlesStatus: Status;
  tagFilterArticlesStatus: Status;
}

export interface MultipleArticlesReqBody {
  limit?: string;
  offset?: string;
}

export interface MultipleTagFilterArticlesReqBody
  extends MultipleArticlesReqBody {
  tag: string;
}
