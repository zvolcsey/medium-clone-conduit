import { AxiosResponse } from 'axios';
import axiosInstance from '../../app/axios';
import {
  DEFAULT_ARTICLES_LIMIT,
  DEFAULT_ARTICLES_OFFSET,
} from '../../app/constant';

import type { MultipleArticlesResBody } from '../../../../server/src/types/appResponse.types';
import {
  MultipleArticlesReqBody,
  MultipleTagFilterArticlesReqBody,
} from '../../app/types/redux.types';

export const initGlobalArticles = async (
  reqData: MultipleArticlesReqBody
): Promise<MultipleArticlesResBody> => {
  const { limit, offset } = reqData;
  const { data }: AxiosResponse<MultipleArticlesResBody> =
    await axiosInstance.get(
      `/api/articles?limit=${limit ?? DEFAULT_ARTICLES_LIMIT}&offset=${
        offset ?? DEFAULT_ARTICLES_OFFSET
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      }
    );
  return data;
};

export const initTagFilterArticles = async (
  reqData: MultipleTagFilterArticlesReqBody
): Promise<MultipleArticlesResBody> => {
  const { limit, offset, tag } = reqData;
  const { data }: AxiosResponse<MultipleArticlesResBody> =
    await axiosInstance.get(
      `/api/articles?limit=${limit ?? DEFAULT_ARTICLES_LIMIT}&offset=${
        offset ?? DEFAULT_ARTICLES_OFFSET
      }&tag=${tag}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      }
    );
  return data;
};
