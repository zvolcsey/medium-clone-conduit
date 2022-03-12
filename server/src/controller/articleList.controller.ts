import * as articleListModels from '../models/articleList.model';
import { AuthError } from '../types/appClasses';
import {
  getNumberQueryParamWithDefault,
  getStringQueryParam,
} from '../utils/utility';

import type { Response, NextFunction } from 'express';
import type { ConduitRequest } from '../types/appRequest.types';
import type { MultipleArticlesResBody } from '../types/appResponse.types';

export const getArticlesHandler = async (
  req: ConduitRequest<null>,
  res: Response<MultipleArticlesResBody>,
  next: NextFunction
): Promise<Response<MultipleArticlesResBody> | void> => {
  const reqUser = req.user;
  try {
    const limit = getNumberQueryParamWithDefault(req.query, 'limit', 20);
    const offset = getNumberQueryParamWithDefault(req.query, 'offset', 0);
    const author = getStringQueryParam(req.query, 'author', null);
    const favoritedByUser = getStringQueryParam(
      req.query,
      'favoritedByUser',
      null
    );
    const tag = getStringQueryParam(req.query, 'tag', null);
    const response = await articleListModels.getArticles(
      reqUser,
      limit,
      offset,
      author,
      favoritedByUser,
      tag
    );

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const feedArticlesHandler = async (
  req: ConduitRequest<null>,
  res: Response<MultipleArticlesResBody>,
  next: NextFunction
): Promise<Response<MultipleArticlesResBody> | void> => {
  const reqUser = req.user;
  try {
    const limit = getNumberQueryParamWithDefault(req.query, 'limit', 20);
    const offset = getNumberQueryParamWithDefault(req.query, 'offset', 0);

    if (!reqUser) throw new AuthError('You are not logged in');

    const response = await articleListModels.getFeedArticles(
      reqUser,
      limit,
      offset
    );

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
