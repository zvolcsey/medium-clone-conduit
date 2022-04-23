import { AxiosRequestHeaders } from 'axios';

export const createRequestHeaders = (token: string | null) => {
  let headers: AxiosRequestHeaders = { 'Content-Type': 'application/json' };

  if (token) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
  }

  return headers;
};
