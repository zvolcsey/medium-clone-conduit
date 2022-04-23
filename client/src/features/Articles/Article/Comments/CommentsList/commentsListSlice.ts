import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initComments } from './commentsListAPI';
import { createCommentAsync } from '../NewComment/newCommentSlice';
import { commentsUnload } from '../commentSlice';

import type {
  ErrorResBody,
  MultipleCommentsResBody,
} from '../../../../../../../server/src/types/appResponse.types';
import type {
  CommentsListState,
  MultipleCommentsPayload,
} from '../../../../../app/types/redux.types';
import type { RootState } from '../../../../../app/store';

const initialState: CommentsListState = {
  comments: [],
  status: 'idle',
};

export const initCommentsAsync = createAsyncThunk<
  MultipleCommentsResBody,
  MultipleCommentsPayload,
  { rejectValue: ErrorResBody }
>('commentsList/initComments', async (reqData) => {
  const response = await initComments(reqData);
  return response;
});

export const commentsListSlice = createSlice({
  name: 'commentsList',
  initialState,
  reducers: {
    deleteComment(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(
        (comment) => comment.resourceId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initCommentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initCommentsAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.comments = action.payload.comments;
      })
      .addCase(initCommentsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.comments.unshift(action.payload!.comment);
      })
      .addCase(commentsUnload, (state) => {
        state.comments = [];
        state.status = 'idle';
      });
  },
});

export const { deleteComment } = commentsListSlice.actions;

export const selectComments = (state: RootState) => state.commentsList.comments;
export const selectStatus = (state: RootState) => state.commentsList.status;

export default commentsListSlice.reducer;
