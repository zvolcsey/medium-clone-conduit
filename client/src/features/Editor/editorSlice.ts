import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { initArticle } from '../Articles/Article/articleAPI';
import { createArticle, updateArticle } from './editorAPI';

import type {
  EditorState,
  CreateArticlePayload,
  UpdateArticlePayload,
  InitArticlePayload,
} from '../../app/types/redux.types';
import type {
  ErrorResBody,
  SingleArticleResBody,
} from '../../../../server/src/types/appResponse.types';

const initialState: EditorState = {
  article: null,
  articleStatus: 'idle',
  editorStatus: 'idle',
  errors: undefined,
  tagList: [],
};

export const initEditedArticleAsync = createAsyncThunk<
  SingleArticleResBody,
  InitArticlePayload,
  { rejectValue: ErrorResBody }
>('editor/initArticle', async (reqData) => {
  const response = await initArticle(reqData);
  return response;
});

export const createArticleAsync = createAsyncThunk<
  SingleArticleResBody | undefined,
  CreateArticlePayload,
  { rejectValue: ErrorResBody }
>('editor/createArticle', async (payload, { rejectWithValue }) => {
  try {
    const response = await createArticle(payload);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const updateArticleAsync = createAsyncThunk<
  SingleArticleResBody | undefined,
  UpdateArticlePayload,
  { rejectValue: ErrorResBody }
>('editor/updateArticle', async (payload, { rejectWithValue }) => {
  try {
    const response = await updateArticle(payload);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    editorPageUnload(state) {
      state.article = null;
      state.articleStatus = 'idle';
      state.editorStatus = 'idle';
      state.errors = undefined;
      state.tagList = [];
    },
    addTag(state, action: PayloadAction<string>) {
      state.tagList.push(action.payload);
    },
    removeTag(state, action: PayloadAction<string>) {
      state.tagList = state.tagList.filter((tag) => tag !== action.payload);
    },
    setTag(state, action: PayloadAction<string[]>) {
      state.tagList = action.payload;
    },
    setErrorDefault(state) {
      state.errors = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initEditedArticleAsync.pending, (state) => {
        state.articleStatus = 'loading';
      })
      .addCase(initEditedArticleAsync.fulfilled, (state, action) => {
        state.articleStatus = 'success';
        state.article = action.payload.article;
      })
      .addCase(initEditedArticleAsync.rejected, (state) => {
        state.articleStatus = 'failed';
      })
      .addCase(createArticleAsync.pending, (state) => {
        state.editorStatus = 'loading';
      })
      .addCase(createArticleAsync.fulfilled, (state) => {
        state.editorStatus = 'success';
        state.errors = undefined;
      })
      .addCase(createArticleAsync.rejected, (state, action) => {
        state.editorStatus = 'failed';
        state.errors = action.payload;
      })
      .addCase(updateArticleAsync.pending, (state) => {
        state.editorStatus = 'loading';
      })
      .addCase(updateArticleAsync.fulfilled, (state) => {
        state.editorStatus = 'success';
        state.errors = undefined;
      })
      .addCase(updateArticleAsync.rejected, (state, action) => {
        state.editorStatus = 'failed';
        state.errors = action.payload;
      });
  },
});

export const { editorPageUnload, addTag, removeTag, setTag, setErrorDefault } =
  editorSlice.actions;

export const selectTags = (state: RootState) => state.editor.tagList;
export const selectArticle = (state: RootState) => state.editor.article;
export const selectArticleStatus = (state: RootState) =>
  state.editor.articleStatus;
export const selectEditorStatus = (state: RootState) =>
  state.editor.editorStatus;
export const selectError = (state: RootState) => state.editor.errors;

export default editorSlice.reducer;
