import { getPopularTags } from '../models/tags.model';

import type { Response, NextFunction } from 'express';
import type { ConduitRequest } from '../types/appRequest.types';
import { getNumberQueryParamWithDefault } from '../utils/utility';

export const getPopularTagsHandler = async (
  req: ConduitRequest<null>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const limit = getNumberQueryParamWithDefault(req.query, 'limit', 20);

    const popularTags = await getPopularTags(limit);

    return res.status(200).json({ tags: popularTags });
  } catch (err) {
    next(err);
  }
};
