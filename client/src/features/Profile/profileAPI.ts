import { AxiosResponse } from 'axios';
import axiosInstance from '../../app/axios';

import { GetProfilePayload } from '../../app/types/redux.types';
import { createRequestHeaders } from '../../utils/utility';
import { ProfileResBody } from '../../../../server/src/types/appResponse.types';

export const getProfile = async ({
  token,
  username,
}: GetProfilePayload): Promise<ProfileResBody> => {
  const headers = createRequestHeaders(token);
  const { data }: AxiosResponse<ProfileResBody> = await axiosInstance.get(
    `/api/profiles/${username}`,
    {
      headers: headers,
      responseType: 'json',
    }
  );
  return data;
};

export const followUser = async ({
  token,
  username,
}: GetProfilePayload): Promise<ProfileResBody> => {
  const { data }: AxiosResponse<ProfileResBody> = await axiosInstance.post(
    `/api/profiles/${username}/follow`,
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

export const unfollowUser = async ({
  token,
  username,
}: GetProfilePayload): Promise<ProfileResBody> => {
  const { data }: AxiosResponse<ProfileResBody> = await axiosInstance.post(
    `/api/profiles/${username}/unfollow`,
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
