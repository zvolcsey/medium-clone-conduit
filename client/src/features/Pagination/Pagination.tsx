import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_PAGE_LIMIT } from '../../app/constant';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentPage } from './paginationSlice';

import styles from './Pagination.module.css';

const Pagination: FC<{ pages: number }> = (props) => {
  const { pages } = props;
  const location = useLocation();

  const currentPage = useAppSelector(selectCurrentPage);

  // Source: https://academind.com/tutorials/reactjs-pagination
  const getPaginationGroup = () => {
    if (pages < DEFAULT_PAGE_LIMIT) {
      return new Array(pages).fill(0).map((_, idx) => idx + 1);
    }
    const start =
      Math.floor((currentPage - 1) / DEFAULT_PAGE_LIMIT) * DEFAULT_PAGE_LIMIT;
    if (start + DEFAULT_PAGE_LIMIT > pages) {
      return new Array(pages - start).fill(0).map((_, idx) => start + idx + 1);
    }
    return new Array(DEFAULT_PAGE_LIMIT)
      .fill(0)
      .map((_, idx) => start + idx + 1);
  };

  if (pages <= 1) {
    return null;
  }

  let prevPage = <span className={styles['item--disabled']}>Prev</span>;
  if (currentPage > 1) {
    prevPage = (
      <Link to={`${location.pathname}?page=${currentPage - 1}`}>Prev</Link>
    );
  }

  let nextPage = <span className={styles['item--disabled']}>Next</span>;
  if (currentPage !== pages) {
    nextPage = (
      <Link to={`${location.pathname}?page=${currentPage + 1}`}>Next</Link>
    );
  }

  let pageItems = getPaginationGroup().map((item) => {
    if (currentPage === item) {
      return (
        <li key={item} className={styles.item}>
          <span className={styles['item--active']}>{item}</span>
        </li>
      );
    }
    return (
      <li key={item} className={styles.item}>
        <Link to={`${location.pathname}?page=${item}`}>{item}</Link>
      </li>
    );
  });

  return (
    <nav className={styles.pagination}>
      <ul className={styles.items}>
        <li className={styles.item}>{prevPage}</li>
        {pageItems}
        <li className={styles.item}>{nextPage}</li>
      </ul>
    </nav>
  );
};

export default Pagination;
