import { Response, NextFunction } from 'express';
import { getProfile, followUser, unfollowUser } from '../models/profiles.model';
import { AuthError } from '../types/appClasses';

import type { ConduitRequest } from '../types/appRequest.types';
import type { ProfileResBody } from '../types/appResponse.types';

export const getProfileHandler = async (
  req: ConduitRequest<null>,
  res: Response<ProfileResBody>,
  next: NextFunction
): Promise<Response<ProfileResBody> | void> => {
  const { username } = req.params;
  const reqUser = req.user;

  let reqUserId: string | null = null;
  if (reqUser) {
    reqUserId = reqUser.id;
  }
  try {
    const profile = await getProfile(reqUserId, username);

    return res.status(200).json({ profile: profile });
  } catch (err) {
    return next(err);
  }
};

export const followUserHandler = async (
  req: ConduitRequest<null>,
  res: Response<ProfileResBody>,
  next: NextFunction
): Promise<Response<ProfileResBody> | void> => {
  const { username } = req.params;
  const reqUser = req.user;
  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    const reqUserId = reqUser.id;

    await followUser(reqUserId, username);

    const profile = await getProfile(reqUserId, username);

    return res.status(200).json({ profile: profile });
  } catch (err) {
    next(err);
  }
};

export const unfollowUserHandler = async (
  req: ConduitRequest<null>,
  res: Response<ProfileResBody>,
  next: NextFunction
): Promise<Response<ProfileResBody> | void> => {
  const { username } = req.params;
  const reqUser = req.user;
  try {
    if (!reqUser) throw new AuthError('You are not logged in');

    const reqUserId = reqUser.id;

    await unfollowUser(reqUserId, username);

    const profile = await getProfile(reqUserId, username);

    return res.status(200).json({ profile: profile });
  } catch (err) {
    next(err);
  }
};
