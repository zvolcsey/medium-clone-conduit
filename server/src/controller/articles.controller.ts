import * as articleModels from '../models/articles.model';
import { AuthError, ValidationError } from '../types/appClasses';

import type { Response, NextFunction } from 'express';
import type { ArticleReqBody, ConduitRequest } from '../types/appRequest.types';
import type { SingleArticleResBody } from '../types/appResponse.types';

export const getArticleHandler = async (
  req: ConduitRequest<null>,
  res: Response<SingleArticleResBody>,
  next: NextFunction
): Promise<Response | void> => {
  const { articleResourceId } = req.params;
  const reqUser = req.user;

  let reqUserId: string | null = null;
  if (reqUser) {
    reqUserId = reqUser.id;
  }
  try {
    const article = await articleModels.getArticle(
      reqUserId,
      articleResourceId
    );

    return res.status(200).json({ article: article });
  } catch (err) {
    next(err);
  }
};

export const createArticleHandler = async (
  req: ConduitRequest<ArticleReqBody>,
  res: Response<SingleArticleResBody>,
  next: NextFunction
): Promise<Response<SingleArticleResBody> | void> => {
  const reqBody = req.body.article;
  const reqUser = req.user;
  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    const article = await articleModels.createArticle(reqBody, reqUser);

    return res.status(201).json({ article: article });
  } catch (err) {
    next(err);
  }
};

export const updateArticleHandler = async (
  req: ConduitRequest<ArticleReqBody>,
  res: Response<SingleArticleResBody>,
  next: NextFunction
): Promise<Response<SingleArticleResBody> | void> => {
  const reqUser = req.user;
  const { articleResourceId } = req.params;
  try {
    if (!req.body.article)
      throw new ValidationError('Missing article Data from Request Body');

    const reqBody = req.body.article;

    if (!reqUser) throw new AuthError('You are not logged in');

    const article = await articleModels.updateArticle(
      reqBody,
      reqUser,
      articleResourceId
    );

    return res.status(200).json({ article: article });
  } catch (err) {
    next(err);
  }
};

export const deleteArticleHandler = async (
  req: ConduitRequest<null>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const reqUser = req.user;
  const { articleResourceId } = req.params;
  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    await articleModels.removeArticle(articleResourceId, reqUser);

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

export const favoriteArticleHandler = async (
  req: ConduitRequest<null>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { articleResourceId } = req.params;
  const reqUser = req.user;
  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    const reqUserId = reqUser.id;

    const isFavorite = await articleModels.checkFavorite(
      reqUser.id,
      articleResourceId
    );

    if (isFavorite)
      throw new ValidationError('You still favorite this article');

    await articleModels.favoriteArticle(articleResourceId, reqUserId);
    const article = await articleModels.getArticle(
      reqUserId,
      articleResourceId
    );

    return res.status(200).json({ article: article });
  } catch (err) {
    next(err);
  }
};

export const unfavoriteArticleHandler = async (
  req: ConduitRequest<null>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { articleResourceId } = req.params;
  const reqUser = req.user;
  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    const reqUserId = reqUser.id;

    const isFavorite = await articleModels.checkFavorite(
      reqUser.id,
      articleResourceId
    );

    if (!isFavorite)
      throw new ValidationError('You do not favorite this article');

    await articleModels.unFavoriteArticle(articleResourceId, reqUserId);
    const article = await articleModels.getArticle(
      reqUserId,
      articleResourceId
    );

    return res.status(200).json({ article: article });
  } catch (err) {
    next(err);
  }
};
