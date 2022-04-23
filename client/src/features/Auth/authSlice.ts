import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { AuthState } from '../../app/types/redux.types';
import { signIn, signUp, authCheck } from './authAPI';
import { UserProperties } from '../../../../server/src/types/appClasses';

import type { AuthUserReqBody } from '../../../../server/src/types/appRequest.types';
import type { ErrorResBody } from '../../../../server/src/types/appResponse.types';

const initialState: AuthState = {
  token: null,
  currentUser: null,
  error: undefined,
  status: 'idle',
};

export const signInAsync = createAsyncThunk<
  UserProperties | undefined,
  AuthUserReqBody,
  { rejectValue: ErrorResBody | undefined }
>('auth/signIn', async (reqData, { rejectWithValue }) => {
  try {
    const user = await signIn(reqData);

    localStorage.setItem('Token', user.token);

    return user;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const signUpAsync = createAsyncThunk<
  UserProperties | undefined,
  AuthUserReqBody,
  { rejectValue: ErrorResBody | undefined }
>('auth/signUp', async (reqData, { rejectWithValue }) => {
  try {
    const user = await signUp(reqData);

    localStorage.setItem('Token', user.token);

    return user;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.errors);
    } else {
      console.log(err);
    }
  }
});

export const authCheckAsync = createAsyncThunk<
  UserProperties | undefined,
  string,
  { rejectValue: ErrorResBody }
>('auth/authCheck', async (token) => {
  const user = await authCheck(token);
  return user;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authPageUnload(state) {
      state.status = 'idle';
      state.error = undefined;
    },
    logout(state) {
      localStorage.removeItem('Token');
      state.token = null;
      state.currentUser = null;
      state.status = 'idle';
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.token = action.payload!.token;
        state.currentUser = action.payload!.username;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.token = action.payload!.token;
        state.currentUser = action.payload!.username;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(authCheckAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authCheckAsync.fulfilled, (state, action) => {
        state.token = action.payload!.token;
        state.currentUser = action.payload!.username;
        state.status = 'success';
        state.error = undefined;
      })
      .addCase(authCheckAsync.rejected, (state, action) => {
        localStorage.removeItem('Token');
        state.token = null;
        state.currentUser = null;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { authPageUnload, logout } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
