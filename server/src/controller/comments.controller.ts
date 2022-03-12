import { Response, NextFunction } from 'express';
import {
  createComment,
  removeComment,
  getComments,
} from '../models/comments.model';
import { getNumberQueryParamWithDefault } from '../utils/utility';
import { AuthError } from '../types/appClasses';

import type { ConduitRequest, CommentReqBody } from '../types/appRequest.types';
import type {
  SingleCommentResBody,
  MultipleCommentsResBody,
} from '../types/appResponse.types';

export const createCommentHandler = async (
  req: ConduitRequest<CommentReqBody>,
  res: Response<SingleCommentResBody>,
  next: NextFunction
): Promise<Response | void> => {
  const { articleResourceId } = req.params;
  const reqBody = req.body.comment;
  const reqUser = req.user;

  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    const comment = await createComment(reqBody, reqUser, articleResourceId);

    return res.status(201).json({ comment: comment });
  } catch (err) {
    next(err);
  }
};

export const getCommentsHandler = async (
  req: ConduitRequest<null>,
  res: Response<MultipleCommentsResBody>,
  next: NextFunction
): Promise<Response<MultipleCommentsResBody> | void> => {
  const reqUser = req.user;
  const { articleResourceId } = req.params;
  const limit = getNumberQueryParamWithDefault(req.query, 'limit', 20);
  const offset = getNumberQueryParamWithDefault(req.query, 'offset', 0);

  let reqUserId: string | null = null;
  if (reqUser) {
    reqUserId = reqUser.id;
  }
  try {
    const response = await getComments(
      reqUserId,
      articleResourceId,
      limit,
      offset
    );

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export const deleteCommentHandler = async (
  req: ConduitRequest<null>,
  res: Response<void>,
  next: NextFunction
): Promise<Response | void> => {
  const { postResourceId, commentResourceId } = req.params;
  const reqUser = req.user;

  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    const reqUserId = reqUser.id;

    await removeComment(reqUserId, postResourceId, commentResourceId);

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};
