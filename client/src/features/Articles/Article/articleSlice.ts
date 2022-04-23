import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { initArticle, deleteArticle } from './articleAPI';

import type {
  SingleArticleResBody,
  ErrorResBody,
} from '../../../../../server/src/types/appResponse.types';
import type {
  ArticleState,
  InitArticlePayload,
  DeleteArticlePayload,
} from '../../../app/types/redux.types';

const initialState: ArticleState = {
  article: null,
  articleStatus: 'idle',
  deleteStatus: 'idle',
};

export const initArticleAsync = createAsyncThunk<
  SingleArticleResBody,
  InitArticlePayload,
  { rejectValue: ErrorResBody }
>('article/initArticle', async (reqData) => {
  const response = await initArticle(reqData);
  return response;
});

export const deleteArticleAsync = createAsyncThunk<
  void,
  DeleteArticlePayload,
  { rejectValue: ErrorResBody }
>('article/deleteArticle', async (reqData) => {
  await deleteArticle(reqData);
});

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articlePageUnload(state) {
      state.article = null;
      state.articleStatus = 'idle';
      state.deleteStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initArticleAsync.pending, (state) => {
        state.articleStatus = 'loading';
      })
      .addCase(initArticleAsync.fulfilled, (state, action) => {
        state.articleStatus = 'success';
        state.article = action.payload.article;
      })
      .addCase(initArticleAsync.rejected, (state) => {
        state.articleStatus = 'failed';
      })
      .addCase(deleteArticleAsync.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteArticleAsync.fulfilled, (state) => {
        state.deleteStatus = 'success';
      })
      .addCase(deleteArticleAsync.rejected, (state) => {
        state.deleteStatus = 'failed';
      });
  },
});

export const { articlePageUnload } = articleSlice.actions;

export const selectArticle = (state: RootState) => state.article.article;
export const selectArticleStatus = (state: RootState) =>
  state.article.articleStatus;
export const selectDeleteStatus = (state: RootState) =>
  state.article.deleteStatus;

export default articleSlice.reducer;
