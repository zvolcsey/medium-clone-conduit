import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getProfile, followUser, unfollowUser } from './profileAPI';

import type {
  GetProfilePayload,
  FollowingPayload,
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
>('profile/getProfile', async (payload) => {
  const response = await getProfile(payload);
  return response;
});

export const followUserAsync = createAsyncThunk<
  ProfileResBody,
  FollowingPayload,
  { rejectValue: ErrorResBody }
>('profile/followUser', async (payload) => {
  const response = await followUser(payload);
  return response;
});

export const unfollowUserAsync = createAsyncThunk<
  ProfileResBody,
  FollowingPayload,
  { rejectValue: ErrorResBody }
>('profile/unfollowUser', async (payload) => {
  const response = await unfollowUser(payload);
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
      })
      .addCase(followUserAsync.pending, (state) => {
        if (state.profile) {
          state.status = 'loading';
        }
      })
      .addCase(followUserAsync.fulfilled, (state, action) => {
        if (state.profile) {
          state.status = 'success';
          state.profile.following = action.payload.profile.following;
        }
      })
      .addCase(followUserAsync.rejected, (state) => {
        if (state.profile) {
          state.status = 'failed';
        }
      })
      .addCase(unfollowUserAsync.pending, (state) => {
        if (state.profile) {
          state.status = 'loading';
        }
      })
      .addCase(unfollowUserAsync.fulfilled, (state, action) => {
        if (state.profile) {
          state.status = 'success';
          state.profile.following = action.payload.profile.following;
        }
      })
      .addCase(unfollowUserAsync.rejected, (state) => {
        if (state.profile) {
          state.status = 'failed';
        }
      });
  },
});

export const { profileUnload } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectStatus = (state: RootState) => state.profile.status;

export default profileSlice.reducer;
