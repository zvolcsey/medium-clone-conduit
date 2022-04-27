import { AxiosResponse } from 'axios';
import axiosInstance from '../../../app/axios';

import type { SingleArticleResBody } from '../../../../../server/src/types/appResponse.types';
import type {
  FavoriteArticlePayload,
  InitArticlePayload,
} from '../../../app/types/redux.types';
import { createRequestHeaders } from '../../../utils/utility';

export const initArticle = async ({
  token,
  resourceId,
}: InitArticlePayload): Promise<SingleArticleResBody> => {
  const headers = createRequestHeaders(token);
  const { data }: AxiosResponse<SingleArticleResBody> = await axiosInstance.get(
    `/api/articles/${resourceId}`,
    {
      headers: headers,
      responseType: 'json',
    }
  );
  return data;
};

export const favoriteArticle = async ({
  token,
  resourceId,
}: FavoriteArticlePayload): Promise<SingleArticleResBody> => {
  const { data }: AxiosResponse<SingleArticleResBody> =
    await axiosInstance.post(
      `/api/articles/${resourceId}/favorite`,
      undefined,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        responseType: 'json',
      }
    );
  return data;
};

export const unfavoriteArticle = async ({
  token,
  resourceId,
}: FavoriteArticlePayload): Promise<SingleArticleResBody> => {
  const { data }: AxiosResponse<SingleArticleResBody> =
    await axiosInstance.delete(`/api/articles/${resourceId}/favorite`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      responseType: 'json',
    });
  return data;
};

export const deleteArticle = async ({
  token,
  resourceId,
}: InitArticlePayload): Promise<void> => {
  const headers = createRequestHeaders(token);

  await axiosInstance.delete(`/api/articles/${resourceId}`, {
    headers: headers,
    responseType: 'json',
  });
};
