import { FC, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';

import Banner from '../components/Banner/Banner';
import PopularTags from '../features/PopularTags/PopularTags';
import { initPopularTagsAsync } from '../features/PopularTags/popularTagsSlice';

const Home: FC<{}> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initPopularTagsAsync());
  }, []);

  return (
    <>
      <Banner />
      <PopularTags />
    </>
  );
};

export default Home;
