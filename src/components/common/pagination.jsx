import React from "react";
import _ from "lodash";

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
  onPageClick,
}) {
  const pageGroupCount = itemCount / pageSize + 1;
  const pages = _.range(1, pageGroupCount);

  if (pages.length <= 1) {
    return;
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
