import React from "react";
import {
  onCloseModal,
  selectMovie,
  setCurrentPage,
  setItemsPerPage,
  setSearchText,
} from "../actions/homeActions";
import Item from "./Item";
import _ from "underscore";
import { HomeState, itemsPerPageArray } from "../reducers/homeReducer";
import classNames from "classnames";
import ModalComponent from "./ModalComponent";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
  BaseProps,
  updateQueryParams,
} from "../hooks";
import LoadingOverlay from "./LoadingOverlay";
class ItemList extends React.Component<BaseProps, {}> {
  setCurrentPage = (pageNumber: number) => {
    this.props.dispatch(setCurrentPage(pageNumber));
    updateQueryParams(this.props.rootState.home.selectedTab, pageNumber);
  };

  render() {
    const homeState: HomeState = this.props.rootState.home;
    const currentPage = homeState.currentPage;
    const itemsPerPage = homeState.itemsPerPage;
    const searchText = homeState.searchText;
    const isLoading = homeState.isLoading;

    let searchRegex = new RegExp("\\b(" + searchText + ")", "i");
    let movies = homeState.movies;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const pageCount = Math.ceil(movies.length / itemsPerPage);

    let currentItems;
    if (searchText !== "") {
      currentItems = _.filter(
        movies,
        (movie) => movie.movieTitle.match(searchRegex) !== null
      );
    } else {
      currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);
    }

    let pageNumberArray = [];
    for (let i = 0; i < pageCount; i++) {
      var pageItemClass = classNames({
        "page-item": true,
        active: currentPage === i + 1,
      });
      pageNumberArray[i] = (
        <li className={pageItemClass} key={"pagination_" + (i + 1)}>
          <button
            className="page-link"
            onClick={() => this.setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      );
    }

    let itemsPerPageSectionWithSearchbox = (
      <nav aria-label="Page navigation" style={{ marginTop: "50px" }}>
        <div className="searchbox">
          <div className="form-group has-search">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={(e) =>
                this.props.dispatch(setSearchText(e.target.value))
              }
            />
          </div>
        </div>
        <ul className="pagination justify-content-end">
          {_.map(itemsPerPageArray, (i, idx) => {
            var itemsPerPageClass = classNames({
              "page-item": true,
              active: itemsPerPage === i,
            });
            return (
              <li className={itemsPerPageClass} key={"itemsPerPage_" + idx}>
                <button
                  className="page-link"
                  onClick={() => this.props.dispatch(setItemsPerPage(i))}
                >
                  {i}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );

    let items =
      currentItems.length > 0 ? (
        <>
          {_.map(currentItems, (movie: any, index: number) => (
            <div
              key={"item_" + index}
              className="col"
              onClick={() => this.props.dispatch(selectMovie(movie))}
            >
              <div className="card p-2 data">
                <Item data={movie} hideOverView={true} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h5>No data found</h5>
        </>
      );
    let itemsSection = <div className="row row-cols-5">{items}</div>;

    let paginationSection = (
      <nav aria-label="Page navigation" style={{ marginTop: "50px" }}>
        <ul className="pagination justify-content-end">
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item "}
          >
            <button
              className="page-link"
              onClick={() => this.setCurrentPage(1)}
            >
              First Page
            </button>
          </li>
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item "}
          >
            <button
              className="page-link"
              onClick={() => this.setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {_.map(pageNumberArray, (li) => li)}
          <li
            className={
              currentPage === pageCount ? "page-item disabled" : "page-item"
            }
          >
            <button
              className="page-link"
              onClick={() => this.setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
          <li
            className={
              currentPage === pageCount ? "page-item disabled" : "page-item"
            }
          >
            <button
              className="page-link"
              onClick={() => this.setCurrentPage(pageCount)}
            >
              Last Page
            </button>
          </li>
        </ul>
      </nav>
    );

    let modalContent =
      homeState.selectedMovie !== undefined ? (
        <Item data={homeState.selectedMovie} />
      ) : (
        <h5>Movie not found</h5>
      );

    let modalview = (
      <ModalComponent
        showModal={homeState.showModal}
        onCloseModal={() => this.props.dispatch(onCloseModal())}
        title={"Movie Details"}
      >
        {modalContent}
      </ModalComponent>
    );

    let content = isLoading ? (
      <LoadingOverlay />
    ) : (
      <div>
        {itemsPerPageSectionWithSearchbox}
        {itemsSection}
        {paginationSection}
        {modalview}
      </div>
    );

    return content;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
