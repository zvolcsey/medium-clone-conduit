import { AxiosResponse } from 'axios';
import axiosInstance from '../../../../../app/axios';
import { createRequestHeaders } from '../../../../../utils/utility';

import type { MultipleCommentsResBody } from '../../../../../../../server/src/types/appResponse.types';
import type { MultipleCommentsPayload } from '../../../../../app/types/redux.types';

export const initComments = async ({
  token,
  articleResourceId,
}: MultipleCommentsPayload): Promise<MultipleCommentsResBody> => {
  const headers = createRequestHeaders(token);
  const { data }: AxiosResponse<MultipleCommentsResBody> =
    await axiosInstance.get(`/api/articles/${articleResourceId}/comments`, {
      headers: headers,
      responseType: 'json',
    });
  return data;
};
