import { AxiosResponse } from 'axios';
import axiosInstance from '../../../app/axios';
import {
  DEFAULT_ARTICLES_LIMIT,
  DEFAULT_ARTICLES_OFFSET,
} from '../../../app/constant';

import type { MultipleArticlesResBody } from '../../../../../server/src/types/appResponse.types';
import {
  MultipleArticlesPayload,
  MultipleAuthorFilterArticlesPayload,
  MultipleFavoritedFilterArticlesPayload,
  MultipleFeedArticlesPayload,
  MultipleTagFilterArticlesPayload,
} from '../../../app/types/redux.types';
import { createRequestHeaders } from '../../../utils/utility';

export const initGlobalArticles = async (
  payload: MultipleArticlesPayload
): Promise<MultipleArticlesResBody> => {
  const { limit, offset, token } = payload;
  const headers = createRequestHeaders(token);
  const { data }: AxiosResponse<MultipleArticlesResBody> =
    await axiosInstance.get(
      `/api/articles?limit=${limit ?? DEFAULT_ARTICLES_LIMIT}&offset=${
        offset ?? DEFAULT_ARTICLES_OFFSET
      }`,
      {
        headers: headers,
        responseType: 'json',
      }
    );
  return data;
};

export const initFeedArticles = async (
  payload: MultipleFeedArticlesPayload
): Promise<MultipleArticlesResBody> => {
  const { limit, offset, token } = payload;
  const { data }: AxiosResponse<MultipleArticlesResBody> =
    await axiosInstance.get(
      `/api/articles/feed?limit=${limit}&offset=${offset}`,
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

export const initTagFilterArticles = async (
  payload: MultipleTagFilterArticlesPayload
): Promise<MultipleArticlesResBody> => {
  const { limit, offset, tag, token } = payload;
  const headers = createRequestHeaders(token);
  const { data }: AxiosResponse<MultipleArticlesResBody> =
    await axiosInstance.get(
      `/api/articles?limit=${limit ?? DEFAULT_ARTICLES_LIMIT}&offset=${
        offset ?? DEFAULT_ARTICLES_OFFSET
      }&tag=${tag}`,
      {
        headers: headers,
        responseType: 'json',
      }
    );
  return data;
};

export const initAuthorFilterArticles = async (
  payload: MultipleAuthorFilterArticlesPayload
): Promise<MultipleArticlesResBody> => {
  const { limit, offset, author, token } = payload;
  const headers = createRequestHeaders(token);
  const { data }: AxiosResponse<MultipleArticlesResBody> =
    await axiosInstance.get(
      `/api/articles?limit=${limit ?? DEFAULT_ARTICLES_LIMIT}&offset=${
        offset ?? DEFAULT_ARTICLES_OFFSET
      }&author=${author}`,
      {
        headers: headers,
        responseType: 'json',
      }
    );
  return data;
};

export const initFavoritedFilterArticles = async (
  payload: MultipleFavoritedFilterArticlesPayload
): Promise<MultipleArticlesResBody> => {
  const { limit, offset, username, token } = payload;
  const headers = createRequestHeaders(token);
  const { data }: AxiosResponse<MultipleArticlesResBody> =
    await axiosInstance.get(
      `/api/articles?limit=${limit ?? DEFAULT_ARTICLES_LIMIT}&offset=${
        offset ?? DEFAULT_ARTICLES_OFFSET
      }&favoritedByUser=${username}`,
      {
        headers: headers,
        responseType: 'json',
      }
    );
  return data;
};
