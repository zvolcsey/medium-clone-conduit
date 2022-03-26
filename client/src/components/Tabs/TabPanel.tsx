import { FC } from 'react';
import { ArticleProperties } from '../../../../server/src/types/appClasses';
import { Status } from '../../app/types/redux.types';

import '../../index.css';
import styles from './TabPanel.module.css';
import ArticlesList from '../../features/Articles/ArticlesList';
import Loading from '../UI/Loading';

const TabPanel: FC<{ items: ArticleProperties[]; status: Status }> = (
  props
) => {
  return (
    <section className={styles['tab-panel']}>
      {props.status === 'loading' && <Loading />}
      {props.status === 'success' && <ArticlesList articles={props.items} />}
      {props.status === 'failed' && (
        <p className='centered bold'>Loading articles was not successfully!</p>
      )}
      {/* TODO: Pagination */}
    </section>
  );
};

export default TabPanel;
