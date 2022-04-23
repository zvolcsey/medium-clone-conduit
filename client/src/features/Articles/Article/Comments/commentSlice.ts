import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteComment } from './commentAPI';

import type { ErrorResBody } from '../../../../../../server/src/types/appResponse.types';
import type {
  CommentState,
  DeleteCommentPayload,
} from '../../../../app/types/redux.types';
import type { RootState } from '../../../../app/store';

const initialState: CommentState = {
  status: 'idle',
};

export const deleteCommentAsync = createAsyncThunk<
  void,
  DeleteCommentPayload,
  { rejectValue: ErrorResBody }
>('comment/deleteComment', async (reqData) => {
  deleteComment(reqData);
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    commentsUnload(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCommentAsync.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { commentsUnload } = commentSlice.actions;

export const selectStatus = (state: RootState) => state.comment.status;

export default commentSlice.reducer;
