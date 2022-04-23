import { AxiosResponse } from 'axios';
import axiosInstance from '../../../app/axios';

import type { SingleArticleResBody } from '../../../../../server/src/types/appResponse.types';
import type { InitArticlePayload } from '../../../app/types/redux.types';
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
