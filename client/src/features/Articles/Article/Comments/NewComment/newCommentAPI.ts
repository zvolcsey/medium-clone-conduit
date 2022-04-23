import { AxiosResponse } from 'axios';
import axiosInstance from '../../../../../app/axios';

import type { SingleCommentResBody } from '../../../../../../../server/src/types/appResponse.types';
import type { CreateCommentPayload } from '../../../../../app/types/redux.types';

export const createComment = async ({
  token,
  articleResourceId,
  reqData,
}: CreateCommentPayload): Promise<SingleCommentResBody> => {
  const { data }: AxiosResponse<SingleCommentResBody> =
    await axiosInstance.post(
      `/api/articles/${articleResourceId}/comments`,
      reqData,
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
