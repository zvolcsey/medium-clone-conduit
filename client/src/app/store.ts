import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import commonReducer from './common-slice';
import popularTagsReducer from '../features/PopularTags/popularTagsSlice';
import articlesListReducer from '../features/Articles/articlesListSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    popularTags: popularTagsReducer,
    articlesList: articlesListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
