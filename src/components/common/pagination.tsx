import React from "react";
import _ from "lodash";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
  onPageClick,
}: Props) {
  const pageGroupCount = itemCount / pageSize + 1;
  const pages: number[] = _.range(1, pageGroupCount);

  if (pages.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
            key={page}
            onClick={() => onPageClick(page)}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
