import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getProfile } from './profileAPI';

import type {
  GetProfilePayload,
  ProfileState,
} from '../../app/types/redux.types';
import type { ProfileResBody } from '../../../../server/src/types/appResponse.types';
import { ErrorResBody } from '../../../../server/src/types/appResponse.types';

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
};

export const getProfileAsync = createAsyncThunk<
  ProfileResBody,
  GetProfilePayload,
  { rejectValue: ErrorResBody }
>('profile/getProfile', async (reqData) => {
  const response = await getProfile(reqData);
  return response;
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileUnload: (state) => {
      state.profile = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.profile = action.payload.profile;
      })
      .addCase(getProfileAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { profileUnload } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectStatus = (state: RootState) => state.profile.status;

export default profileSlice.reducer;
