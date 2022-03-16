import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';
import type { CommonState } from './types/redux.types';

const initialState: CommonState = {
  appName: 'conduit',
  appSlogan: 'A place to share your knowledge',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
});

export const selectAppName = (state: RootState) => state.common.appName;
export const selectAppSlogan = (state: RootState) => state.common.appSlogan;

export default commonSlice.reducer;
