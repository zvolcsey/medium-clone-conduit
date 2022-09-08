import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectPopularTags, selectPopularTagsStatus } from './popularTagsSlice';

import TagList from '../../components/Tags/TagList';
import Card from '../../components/UI/Card';
import '../../index.css';
import styles from './PopularTags.module.css';
import Loading from '../../components/UI/Loading';

const PopularTags: FC<{}> = () => {
  const popularTags = useAppSelector(selectPopularTags);
  const status = useAppSelector(selectPopularTagsStatus);

  return (
    <section className={styles['popular-tags']}>
      <Card className={styles['popular-tags__card']}>
        <h1>Popular Tags</h1>
        {status === 'loading' && <Loading />}
        {status === 'success' && <TagList tags={popularTags} />}
        {status === 'failed' && (
          <p className="centered bold">
            Loading popular tags was not successfully!
          </p>
        )}
      </Card>
    </section>
  );
};

export default PopularTags;
