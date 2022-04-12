import { AxiosResponse } from 'axios';
import axiosInstance from '../../app/axios';

import type { AuthUserReqBody } from '../../../../server/src/types/appRequest.types';
import { UserProperties } from '../../../../server/src/types/appClasses';
import type { UserResBody } from '../../../../server/src/types/appResponse.types';

export const signIn = async (
  reqData: AuthUserReqBody
): Promise<UserProperties> => {
  const { data }: AxiosResponse<UserResBody> = await axiosInstance.post(
    '/api/users/sign-in',
    reqData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    }
  );

  localStorage.setItem('Token', data.user.token);

  return data.user;
};

export const signUp = async (
  reqData: AuthUserReqBody
): Promise<UserProperties> => {
  const { data }: AxiosResponse<UserResBody> = await axiosInstance.post(
    '/api/users',
    reqData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    }
  );
  localStorage.setItem('Token', data.user.token);
  return data.user;
};

export const authCheck = async (token: string): Promise<UserProperties> => {
  const { data }: AxiosResponse<UserResBody> = await axiosInstance.get(
    '/api/user',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      responseType: 'json',
    }
  );

  return data.user;
};
