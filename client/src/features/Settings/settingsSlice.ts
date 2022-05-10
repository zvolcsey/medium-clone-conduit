import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import type {
  GetProfilePayload,
  SettingsState,
  UpdateUserPayload,
} from '../../app/types/redux.types';
import type {
  ProfileResBody,
  UserResBody,
} from '../../../../server/src/types/appResponse.types';
import { ErrorResBody } from '../../../../server/src/types/appResponse.types';
import { getProfile } from '../Profile/profileAPI';
import { updateUser } from './settingsAPI';

const initialState: SettingsState = {
  profile: null,
  profileStatus: 'idle',
  profileErrors: undefined,
  usernameStatus: 'idle',
  usernameErrors: undefined,
  passwordStatus: 'idle',
  passwordErrors: undefined,
  bioStatus: 'idle',
  bioErrors: undefined,
};

export const getEditedProfileAsync = createAsyncThunk<
  ProfileResBody,
  GetProfilePayload,
  { rejectValue: ErrorResBody }
>('settings/getProfile', async (payload) => {
  const response = await getProfile(payload);
  return response;
});

export const updateUsernameAsync = createAsyncThunk<
  UserResBody | undefined,
  UpdateUserPayload,
  { rejectValue: ErrorResBody }
>('settings/updateUsername', async (payload, { rejectWithValue }) => {
  try {
    const response = await updateUser(payload);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const updatePasswordAsync = createAsyncThunk<
  UserResBody | undefined,
  UpdateUserPayload,
  { rejectValue: ErrorResBody }
>('settings/updatePassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await updateUser(payload);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const updateBioAsync = createAsyncThunk<
  UserResBody | undefined,
  UpdateUserPayload,
  { rejectValue: ErrorResBody }
>('settings/updateBio', async (payload, { rejectWithValue }) => {
  try {
    const response = await updateUser(payload);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsPageUnload: (state) => {
      state.profile = null;
      state.profileStatus = 'idle';
      state.profileErrors = undefined;
      state.usernameStatus = 'idle';
      state.usernameErrors = undefined;
      state.passwordStatus = 'idle';
      state.passwordErrors = undefined;
      state.bioStatus = 'idle';
      state.bioErrors = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEditedProfileAsync.pending, (state) => {
        state.profileStatus = 'loading';
      })
      .addCase(getEditedProfileAsync.fulfilled, (state, action) => {
        state.profileStatus = 'success';
        state.profile = action.payload.profile;
        state.profileErrors = undefined;
      })
      .addCase(getEditedProfileAsync.rejected, (state) => {
        state.profileStatus = 'failed';
      })
      .addCase(updateUsernameAsync.pending, (state) => {
        state.usernameStatus = 'loading';
      })
      .addCase(updateUsernameAsync.fulfilled, (state) => {
        state.usernameStatus = 'success';
        state.usernameErrors = undefined;
      })
      .addCase(updateUsernameAsync.rejected, (state, action) => {
        state.usernameStatus = 'failed';
        state.usernameErrors = action.payload;
      })
      .addCase(updatePasswordAsync.pending, (state) => {
        state.passwordStatus = 'loading';
      })
      .addCase(updatePasswordAsync.fulfilled, (state) => {
        state.passwordStatus = 'success';
        state.passwordErrors = undefined;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.passwordStatus = 'failed';
        state.passwordErrors = action.payload;
      })
      .addCase(updateBioAsync.pending, (state) => {
        state.bioStatus = 'loading';
      })
      .addCase(updateBioAsync.fulfilled, (state) => {
        state.bioStatus = 'success';
        state.bioErrors = undefined;
      })
      .addCase(updateBioAsync.rejected, (state, action) => {
        state.bioStatus = 'failed';
        state.bioErrors = action.payload;
      });
  },
});

export const { settingsPageUnload } = settingsSlice.actions;

export const selectProfile = (state: RootState) => state.settings.profile;
export const selectProfileStatus = (state: RootState) =>
  state.settings.profileStatus;
export const selectProfileErrors = (state: RootState) =>
  state.settings.profileErrors;
export const selectUsernameStatus = (state: RootState) =>
  state.settings.usernameStatus;
export const selectUsernameErrors = (state: RootState) =>
  state.settings.usernameErrors;
export const selectPasswordStatus = (state: RootState) =>
  state.settings.passwordStatus;
export const selectPasswordErrors = (state: RootState) =>
  state.settings.passwordErrors;
export const selectBioStatus = (state: RootState) => state.settings.bioStatus;
export const selectBioErrors = (state: RootState) => state.settings.bioErrors;

export default settingsSlice.reducer;
