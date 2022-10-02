import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_PAGE_LIMIT } from '../../app/constant';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentPage } from './paginationSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

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

  let prevPage = (
    <span className={`${styles['item--disabled']} ${styles.prev}`}>
      <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      Prev
    </span>
  );
  if (currentPage > 1) {
    prevPage = (
      <Link
        to={`${location.pathname}?page=${currentPage - 1}`}
        className={styles.prev}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
        Prev
      </Link>
    );
  }

  let nextPage = (
    <span className={`${styles['item--disabled']} ${styles.next}`}>
      Next <FontAwesomeIcon icon={faChevronRight} size="sm" />
    </span>
  );
  if (currentPage !== pages) {
    nextPage = (
      <Link
        to={`${location.pathname}?page=${currentPage + 1}`}
        className={styles.next}
      >
        Next <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </Link>
    );
  }

  const pageItems = getPaginationGroup().map((item) => {
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
