import { AuthError, ValidationError } from '../types/appClasses';
import {
  signIn,
  signUp,
  getCurrentUser,
  updateUser,
} from '../models/users.model';

import type { Response, NextFunction } from 'express';
import type {
  ConduitRequest,
  AuthUserReqBody,
  UpdateUserReqBody,
} from '../types/appRequest.types';
import { UserResBody } from '../types/appResponse.types';
import { getTokenFromHeader } from '../utils/utility';

export const postSignInHandler = async (
  req: ConduitRequest<AuthUserReqBody>,
  res: Response<UserResBody>,
  next: NextFunction
): Promise<Response<UserResBody> | void> => {
  try {
    if (!req.body.user || !req.body.user.username || !req.body.user.password)
      throw new ValidationError('Missing Data from Request Body');

    const { username, password } = req.body.user;

    const user = await signIn(username, password);
    return res.status(200).json({ user: user });
  } catch (err) {
    return next(err);
  }
};

export const postSignUpHandler = async (
  req: ConduitRequest<AuthUserReqBody>,
  res: Response<UserResBody>,
  next: NextFunction
): Promise<Response<UserResBody> | void> => {
  try {
    const { username, password } = req.body.user;

    const user = await signUp(username, password);

    return res.status(200).json({ user: user });
  } catch (err) {
    return next(err);
  }
};

export const getCurrentUserHandler = async (
  req: ConduitRequest<null>,
  res: Response<UserResBody>,
  next: NextFunction
): Promise<Response<UserResBody> | void> => {
  const reqUser = req.user;
  const token = getTokenFromHeader(req.headers.authorization);
  try {
    if (!token || !reqUser) throw new AuthError('There is not logged user');

    const reqUsername = reqUser.username;

    const user = await getCurrentUser(reqUsername, token);

    return res.status(200).json({ user: user });
  } catch (err) {
    return next(err);
  }
};

export const updateUserHandler = async (
  req: ConduitRequest<UpdateUserReqBody>,
  res: Response<UserResBody>,
  next: NextFunction
): Promise<Response<UserResBody> | void> => {
  const reqUser = req.user;
  const token = getTokenFromHeader(req.headers.authorization);
  try {
    if (!req.body.user)
      throw new ValidationError('Missing User Data from Request Body');

    const reqBody = req.body.user;

    if (!token || !reqUser) throw new AuthError('You are not logged in');

    const user = await updateUser(reqBody, reqUser, token);

    return res.status(200).json({ user: user });
  } catch (err) {
    return next(err);
  }
};
