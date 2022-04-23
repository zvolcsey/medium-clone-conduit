import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createComment } from './newCommentAPI';
import { commentsUnload } from '../commentSlice';

import type {
  ErrorResBody,
  SingleCommentResBody,
} from '../../../../../../../server/src/types/appResponse.types';
import type {
  NewCommentState,
  CreateCommentPayload,
} from '../../../../../app/types/redux.types';
import type { RootState } from '../../../../../app/store';

const initialState: NewCommentState = {
  status: 'idle',
  errors: undefined,
};

export const createCommentAsync = createAsyncThunk<
  SingleCommentResBody | undefined,
  CreateCommentPayload,
  { rejectValue: ErrorResBody }
>('newComment/createComment', async (reqData, { rejectWithValue }) => {
  try {
    const response = await createComment(reqData);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const newCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCommentAsync.fulfilled, (state) => {
        state.status = 'success';
        state.errors = undefined;
      })
      .addCase(createCommentAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload;
      })
      .addCase(commentsUnload, (state) => {
        state.status = 'idle';
        state.errors = undefined;
      });
  },
});

export const selectStatus = (state: RootState) => state.newComment.status;
export const selectError = (state: RootState) => state.newComment.errors;

export default newCommentSlice.reducer;
