import React, { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  //Limit the page nmbers shown
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(0);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pageNumbers = [];
  const nbrPages = Math.ceil(totalProducts / productsPerPage);
  for (let i = 1; i <= nbrPages; i++) {
    pageNumbers.push(i);
  }

  //Paginate
  const paginate = (number) => {
    setCurrentPage(number);
  };

  //Go next page
  const paginateNext = () => {
    if (currentPage === nbrPages) return;

    if (currentPage >= maxPageNumberLimit + pageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + 1);
      setMinPageNumberLimit(minPageNumberLimit + 1);
    }

    setCurrentPage(currentPage + 1);
  };

  //Go next page
  const paginatePrev = () => {
    if (currentPage === minPageNumberLimit + 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - 1);
      setMinPageNumberLimit(minPageNumberLimit - 1);
    }
    setCurrentPage(currentPage - 1);
  };

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? styles.hidden : null}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (
          number <= maxPageNumberLimit + pageNumberLimit &&
          number > minPageNumberLimit
        ) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          );
        }
        return null;
      })}
      <li
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? styles.hidden
            : null
        }
        onClick={paginateNext}
      >
        Next
      </li>
      <p>
        <b className={styles.page}>Page {currentPage}</b> of <b>{nbrPages}</b>
      </p>
    </ul>
  );
};

export default Pagination;
