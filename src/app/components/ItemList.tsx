import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllMovies } from "../actions/homeActions";

import Item from "./Item";

const ItemList = () => {
  const homeState = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllMovies);
  }, []);

  let movies = homeState.movies;
  let itemsPerPageArray: number[] = [5, 10, 15];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageArray[0]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(movies.length / itemsPerPage);

  let pageNumberArray = [];
  for (let i = 0; i < pageCount; i++) {
    pageNumberArray[i] = (
      <li className={currentPage === i + 1 ? "page-item active" : "page-item"}>
        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </button>
      </li>
    );
  }

  let itemsPerPageSection = (
    <nav aria-label="Page navigation" style={{ marginTop: "50px" }}>
      <ul className="pagination justify-content-end">
        {itemsPerPageArray.map((i) => (
          <li className={itemsPerPage === i ? "page-item active" : "page-item"}>
            <button className="page-link" onClick={() => setItemsPerPage(i)}>
              {i}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  let items =
    homeState.movies.length > 0 ? (
      <>
        {currentItems.map((movie: any, index: number) => (
          <Item data={movie} itemKey={"item_" + index} />
        ))}
      </>
    ) : null;
  let itemsSection = <div className="row row-cols-5">{items}</div>;

  let paginationSection = (
    <nav aria-label="Page navigation" style={{ marginTop: "50px" }}>
      <ul className="pagination justify-content-end">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item "}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pageNumberArray.map((li) => li)}
        <li
          className={
            currentPage === pageCount ? "page-item disabled" : "page-item "
          }
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
  return (
    <div>
      {itemsPerPageSection}
      {itemsSection}
      {paginationSection}
    </div>
  );
};

export default ItemList;
