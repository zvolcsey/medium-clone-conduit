import { AxiosResponse } from 'axios';
import axiosInstance from '../../app/axios';

import type { PopularTagsResBody } from '../../../../server/src/types/appResponse.types';

export const initPopularTags = async (): Promise<string[]> => {
  const { data }: AxiosResponse<PopularTagsResBody> = await axiosInstance.get(
    '/api/tags'
  );
  return data.tags;
};
