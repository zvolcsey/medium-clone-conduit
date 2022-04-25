import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import commonReducer from './common-slice';
import popularTagsReducer from '../features/PopularTags/popularTagsSlice';
import articlesListReducer from '../features/Articles/ArticlesList/articlesListSlice';
import articleReducer from '../features/Articles/Article/articleSlice';
import commentReducer from '../features/Articles/Article/Comments/commentSlice';
import commentsListReducer from '../features/Articles/Article/Comments/CommentsList/commentsListSlice';
import newCommentReducer from '../features/Articles/Article/Comments/NewComment/newCommentSlice';
import paginationReducer from '../features/Pagination/paginationSlice';
import authReducer from '../features/Auth/authSlice';
import profileReducer from '../features/Profile/profileSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    popularTags: popularTagsReducer,
    articlesList: articlesListReducer,
    article: articleReducer,
    comment: commentReducer,
    commentsList: commentsListReducer,
    newComment: newCommentReducer,
    pagination: paginationReducer,
    auth: authReducer,
    profile: profileReducer,
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
