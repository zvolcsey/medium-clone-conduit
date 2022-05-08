import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  initArticle,
  favoriteArticle,
  unfavoriteArticle,
  deleteArticle,
} from './articleAPI';
import { followUserAsync, unfollowUserAsync } from '../../Profile/profileSlice';

import type {
  SingleArticleResBody,
  ErrorResBody,
} from '../../../../../server/src/types/appResponse.types';
import type {
  ArticleState,
  InitArticlePayload,
  DeleteArticlePayload,
  FavoriteArticlePayload,
} from '../../../app/types/redux.types';
import {
  createArticleAsync,
  editorPageUnload,
  updateArticleAsync,
} from '../../Editor/editorSlice';

const initialState: ArticleState = {
  article: null,
  articleStatus: 'idle',
  favoriteStatus: 'idle',
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

export const favoriteArticleAsync = createAsyncThunk<
  SingleArticleResBody,
  FavoriteArticlePayload,
  { rejectValue: ErrorResBody }
>('article/favoriteArticle', async (payload) => {
  const response = await favoriteArticle(payload);
  return response;
});

export const unfavoriteArticleAsync = createAsyncThunk<
  SingleArticleResBody,
  FavoriteArticlePayload,
  { rejectValue: ErrorResBody }
>('article/unfavoriteArticle', async (payload) => {
  const response = await unfavoriteArticle(payload);
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
      state.favoriteStatus = 'idle';
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
      .addCase(favoriteArticleAsync.pending, (state) => {
        if (state.article) {
          state.favoriteStatus = 'loading';
        }
      })
      .addCase(favoriteArticleAsync.fulfilled, (state, action) => {
        if (state.article) {
          state.favoriteStatus = 'success';
          state.article!.favorited = action.payload.article.favorited;
          state.article!.favoritesCount = action.payload.article.favoritesCount;
        }
      })
      .addCase(favoriteArticleAsync.rejected, (state) => {
        if (state.article) {
          state.favoriteStatus = 'failed';
        }
      })
      .addCase(unfavoriteArticleAsync.pending, (state) => {
        if (state.article) {
          state.favoriteStatus = 'loading';
        }
      })
      .addCase(unfavoriteArticleAsync.fulfilled, (state, action) => {
        if (state.article) {
          state.favoriteStatus = 'success';
          state.article!.favorited = action.payload.article.favorited;
          state.article!.favoritesCount = action.payload.article.favoritesCount;
        }
      })
      .addCase(unfavoriteArticleAsync.rejected, (state) => {
        if (state.article) {
          state.favoriteStatus = 'failed';
        }
      })
      .addCase(deleteArticleAsync.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteArticleAsync.fulfilled, (state) => {
        state.deleteStatus = 'success';
      })
      .addCase(deleteArticleAsync.rejected, (state) => {
        state.deleteStatus = 'failed';
      })
      .addCase(followUserAsync.fulfilled, (state, action) => {
        if (state.article) {
          state.article.author.following = action.payload.profile.following;
        }
      })
      .addCase(unfollowUserAsync.fulfilled, (state, action) => {
        if (state.article) {
          state.article.author.following = action.payload.profile.following;
        }
      })
      .addCase(createArticleAsync.fulfilled, (state, action) => {
        state.article = action.payload!.article;
        state.articleStatus = 'success';
      })
      .addCase(updateArticleAsync.fulfilled, (state, action) => {
        state.article = action.payload!.article;
        state.articleStatus = 'success';
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
