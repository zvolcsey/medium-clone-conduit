import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectAppName, selectAppSlogan } from '../../app/common-slice';

import styles from './Banner.module.css';

const Banner: FC<{}> = () => {
  const appName = useAppSelector(selectAppName);
  const appSlogan = useAppSelector(selectAppSlogan);

  return (
    <section className={styles.banner}>
      <h1>{appName.toLowerCase()}</h1>
      <p>{appSlogan}</p>
    </section>
  );
};

export default Banner;
