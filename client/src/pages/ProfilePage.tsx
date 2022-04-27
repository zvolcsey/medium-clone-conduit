import { FC, useEffect } from 'react';
import {
  useLocation,
  useParams,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom';
import { selectAppName } from '../app/common-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  DEFAULT_ARTICLES_LIMIT,
  DEFAULT_ARTICLES_OFFSET,
} from '../app/constant';
import {
  getProfileAsync,
  profileUnload,
  selectProfile,
  selectStatus,
} from '../features/Profile/profileSlice';
import {
  articlesUnload,
  initAuthorFilterArticlesAsync,
  initFavoritedFilterArticlesAsync,
} from '../features/Articles/ArticlesList/articlesListSlice';
import { selectToken } from '../features/Auth/authSlice';

import '../index.css';
import ProfileTabs from '../components/Tabs/ProfileTabs';
import Loading from '../components/UI/Loading';
import Profile from '../features/Profile/Profile';
import TabPanel from '../components/Tabs/TabPanel';
import { setCurrentPage } from '../features/Pagination/paginationSlice';

const ProfilePage: FC<{}> = () => {
  const dispatch = useAppDispatch();

  const appName = useAppSelector(selectAppName);
  const token = useAppSelector(selectToken);
  const profileData = useAppSelector(selectProfile);
  const status = useAppSelector(selectStatus);

  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const username = params.username!;
  const [searchParams] = useSearchParams();

  const pageSearchParam =
    Number(searchParams.get('page')) === 0
      ? 1
      : Number(searchParams.get('page'));

  const articlesOffset =
    pageSearchParam === 1
      ? DEFAULT_ARTICLES_OFFSET
      : pageSearchParam * DEFAULT_ARTICLES_LIMIT - DEFAULT_ARTICLES_LIMIT;

  useEffect(() => {
    if (pathname === `/profile/@${username}`) {
      document.title = `@${username} | ${appName}`;
    }
    if (pathname === `/profile/@${username}/favorites`) {
      document.title = `Articles favorited by @${username} | ${appName}`;
    }
  }, [pathname, appName, username]);

  useEffect(() => {
    dispatch(getProfileAsync({ token, username }));
    return () => {
      dispatch(profileUnload());
    };
  }, [dispatch, token, username]);

  useEffect(() => {
    dispatch(setCurrentPage(pageSearchParam));
    if (pathname === `/profile/@${username}`) {
      dispatch(
        initAuthorFilterArticlesAsync({
          limit: DEFAULT_ARTICLES_LIMIT,
          offset: articlesOffset,
          author: username,
          token: token,
        })
      );
    }
    if (pathname === `/profile/@${username}/favorites`) {
      dispatch(
        initFavoritedFilterArticlesAsync({
          limit: DEFAULT_ARTICLES_LIMIT,
          offset: articlesOffset,
          username: username,
          token: token,
        })
      );
    }
    return () => {
      dispatch(articlesUnload());
    };
  }, [dispatch, pathname, username, token, searchParams]);

  let profile = <Loading />;

  if (status === 'success' && profileData) {
    profile = <Profile profile={profileData} />;
  }

  if (status === 'failed') {
    profile = <p className='centered'>Loading profile was not successfully</p>;
  }

  return (
    <>
      {profile}
      <ProfileTabs username={username} />
      <Routes>
        <Route index element={<TabPanel />} />
        <Route path='favorites' element={<TabPanel />} />
      </Routes>
    </>
  );
};

export default ProfilePage;
