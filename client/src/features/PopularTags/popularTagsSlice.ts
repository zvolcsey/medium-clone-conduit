import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initPopularTags } from './popularTagsAPI';

import type { RootState } from '../../app/store';
import type { PopularTagsState } from '../../app/types/redux.types';
import { ErrorResBody } from '../../../../server/src/types/appResponse.types';

const initialState: PopularTagsState = {
  tags: [],
  status: 'idle',
};

export const initPopularTagsAsync = createAsyncThunk<
  string[],
  undefined,
  { rejectValue: ErrorResBody }
>('tags/initPopularTags', async () => {
  const response = await initPopularTags();
  return response;
});

const popularTagsSlice = createSlice({
  name: 'popularTags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initPopularTagsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initPopularTagsAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.tags = action.payload;
      })
      .addCase(initPopularTagsAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const selectPopularTags = (state: RootState) => state.popularTags.tags;
export const selectPopularTagsStatus = (state: RootState) =>
  state.popularTags.status;

export default popularTagsSlice.reducer;
