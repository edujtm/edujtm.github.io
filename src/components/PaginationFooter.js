import React from "react";
import { Link } from "gatsby-plugin-react-i18next";

import paginationStyles from "../styles/components/PaginationFooter.module.scss";

const getPreviousLink = (isFirst, prevPage) => {
  if (!isFirst) {
    return ( 
      <Link to={`/blog/${prevPage}`} rel="prev"> 
        Previous Page
      </Link>
    );
  } else {
    return (
      <span className={paginationStyles.disabled}>
        <button>Previous Page</button>
      </span>
    )
  }
}

const getNextLink = (isLast, nextPage) => {
  if (!isLast) {
    return (
      <Link id={paginationStyles.next} to={`/blog/${nextPage}`} rel="next"> 
        Next Page
      </Link>
    );
  } else {
    return (
      <span className={paginationStyles.disabled}>
        <button>Next Page</button>
      </span>
    );
  }
}

const PaginationFooter = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <div className={paginationStyles.footerContainer}>
      <div className={paginationStyles.lineSeparator}></div>
      <div className={paginationStyles.paginationContainer}>
        {getPreviousLink(isFirst, prevPage)}
        {getNextLink(isLast, nextPage)}
      </div>
    </div>
  );
};

export default PaginationFooter;
