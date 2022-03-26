import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { initGlobalArticles, initTagFilterArticles } from './articlesListAPI';

import type {
  ArticlesState,
  MultipleArticlesReqBody,
  MultipleTagFilterArticlesReqBody,
} from '../../app/types/redux.types';
import type { MultipleArticlesResBody } from '../../../../server/src/types/appResponse.types';
import { ErrorResBody } from '../../../../server/src/types/appResponse.types';

const initialState: ArticlesState = {
  globalArticles: [],
  feedArticles: [],
  tagFilterArticles: [],
  globalArticlesCount: 0,
  feedArticlesCount: 0,
  tagFilterArticlesCount: 0,
  globalArticlesStatus: 'idle',
  feedArticlesStatus: 'idle',
  tagFilterArticlesStatus: 'idle',
};

export const initGlobalArticlesAsync = createAsyncThunk<
  MultipleArticlesResBody,
  MultipleArticlesReqBody,
  { rejectValue: ErrorResBody }
>('articlesList/initGlobalArticles', async (reqData) => {
  const response = await initGlobalArticles(reqData);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initGlobalArticlesAsync.pending, (state) => {
        state.globalArticlesStatus = 'loading';
      })
      .addCase(initGlobalArticlesAsync.fulfilled, (state, action) => {
        state.globalArticlesStatus = 'success';
        state.globalArticles = action.payload.articles;
        state.globalArticlesCount = action.payload.articlesCount;
      })
      .addCase(initGlobalArticlesAsync.rejected, (state) => {
        state.globalArticlesStatus = 'failed';
      })
      .addCase(initTagFilterArticlesAsync.pending, (state) => {
        state.tagFilterArticlesStatus = 'loading';
      })
      .addCase(initTagFilterArticlesAsync.fulfilled, (state, action) => {
        state.tagFilterArticlesStatus = 'success';
        state.tagFilterArticles = action.payload.articles;
        state.tagFilterArticlesCount = action.payload.articlesCount;
      })
      .addCase(initTagFilterArticlesAsync.rejected, (state) => {
        state.tagFilterArticlesStatus = 'failed';
      });
  },
});

export const selectGlobalArticles = (state: RootState) =>
  state.articlesList.globalArticles;
export const selectFeedArticles = (state: RootState) =>
  state.articlesList.feedArticles;
export const selectTagFilterArticles = (state: RootState) =>
  state.articlesList.tagFilterArticles;
export const selectGlobalArticlesCount = (state: RootState) =>
  state.articlesList.globalArticlesCount;
export const selectFeedArticlesCount = (state: RootState) =>
  state.articlesList.feedArticlesCount;
export const selectTagFilterArticlesCount = (state: RootState) =>
  state.articlesList.tagFilterArticlesCount;
export const selectGlobalArticlesStatus = (state: RootState) =>
  state.articlesList.globalArticlesStatus;
export const selectFeedArticlesStatus = (state: RootState) =>
  state.articlesList.feedArticlesStatus;
export const selectTagFilterArticlesStatus = (state: RootState) =>
  state.articlesList.tagFilterArticlesStatus;

export default articlesListSlice.reducer;
