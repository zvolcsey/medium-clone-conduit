import axiosInstance from '../../../../app/axios';

import type { DeleteCommentPayload } from '../../../../app/types/redux.types';

export const deleteComment = async ({
  token,
  articleResourceId,
  commentResourceId,
}: DeleteCommentPayload): Promise<void> => {
  await axiosInstance.delete(
    `/api/articles/${articleResourceId}/comments/${commentResourceId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      responseType: 'json',
    }
  );
};
