import { createSlice } from '@reduxjs/toolkit';
import { articlesUnload } from '../Articles/articlesListSlice';

import type { RootState } from '../../app/store';
import type { PaginationState } from '../../app/types/redux.types';

const initialState: PaginationState = {
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(articlesUnload, (state) => {
      state.currentPage = 1;
    });
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;

export default paginationSlice.reducer;
