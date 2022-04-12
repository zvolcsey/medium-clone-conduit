import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  initGlobalArticles,
  initFeedArticles,
  initTagFilterArticles,
} from './articlesListAPI';

import type {
  ArticlesListState,
  MultipleArticlesReqBody,
  MultipleFeedArticlesReqBody,
  MultipleTagFilterArticlesReqBody,
} from '../../app/types/redux.types';
import type { MultipleArticlesResBody } from '../../../../server/src/types/appResponse.types';
import { ErrorResBody } from '../../../../server/src/types/appResponse.types';

const initialState: ArticlesListState = {
  articles: [],
  articlesCount: null,
  status: 'idle',
};

export const initGlobalArticlesAsync = createAsyncThunk<
  MultipleArticlesResBody,
  MultipleArticlesReqBody,
  { rejectValue: ErrorResBody }
>('articlesList/initGlobalArticles', async (reqData) => {
  const response = await initGlobalArticles(reqData);
  return response;
});

export const initFeedArticlesAsync = createAsyncThunk<
  MultipleArticlesResBody,
  MultipleFeedArticlesReqBody,
  { rejectValue: ErrorResBody }
>('articleList/initFeedArticles', async (token) => {
  const response = await initFeedArticles(token);
  return response;
});

export const initTagFilterArticlesAsync = createAsyncThunk<
  MultipleArticlesResBody,
  MultipleTagFilterArticlesReqBody,
  { rejectValue: ErrorResBody }
>('articlesList/initTagFilterArticles', async (reqData) => {
  const response = await initTagFilterArticles(reqData);
  return response;
});

export const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState,
  reducers: {
    articlesUnload: (state) => {
      state.articles = [];
      state.articlesCount = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initGlobalArticlesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initGlobalArticlesAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(initGlobalArticlesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(initFeedArticlesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initFeedArticlesAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(initFeedArticlesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(initTagFilterArticlesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initTagFilterArticlesAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(initTagFilterArticlesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { articlesUnload } = articlesListSlice.actions;

export const selectArticles = (state: RootState) => state.articlesList.articles;
export const selectArticlesCount = (state: RootState) =>
  state.articlesList.articlesCount;
export const selectStatus = (state: RootState) => state.articlesList.status;

export default articlesListSlice.reducer;
