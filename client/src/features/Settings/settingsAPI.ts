import { AxiosResponse } from 'axios';
import axiosInstance from '../../app/axios';

import type { UpdateUserPayload } from '../../app/types/redux.types';
import type { UserResBody } from '../../../../server/src/types/appResponse.types';

export const updateUser = async ({
  token,
  reqBody,
}: UpdateUserPayload): Promise<UserResBody> => {
  const { data }: AxiosResponse<UserResBody> = await axiosInstance.patch(
    `api/user`,
    reqBody,
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
