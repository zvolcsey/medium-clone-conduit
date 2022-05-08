import { AxiosResponse } from 'axios';
import axiosInstance from '../../app/axios';

import type {
  CreateArticlePayload,
  UpdateArticlePayload,
} from '../../app/types/redux.types';
import type { SingleArticleResBody } from '../../../../server/src/types/appResponse.types';

export const createArticle = async ({
  token,
  reqBody,
}: CreateArticlePayload): Promise<SingleArticleResBody> => {
  const { data }: AxiosResponse<SingleArticleResBody> =
    await axiosInstance.post('/api/articles', reqBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      responseType: 'json',
    });
  return data;
};

export const updateArticle = async ({
  token,
  resourceId,
  reqBody,
}: UpdateArticlePayload): Promise<SingleArticleResBody> => {
  const { data }: AxiosResponse<SingleArticleResBody> =
    await axiosInstance.patch(`api/articles/${resourceId}`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      responseType: 'json',
    });
  return data;
};
