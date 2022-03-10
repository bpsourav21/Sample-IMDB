import React from "react";
import {
  getAllMovies,
  setCurrentPage,
  setItemsPerPage,
  setSearchText,
} from "../actions/homeActions";
import Item from "./Item";
import _ from "underscore";
import { HomeState, itemsPerPageArray } from "../reducers/homeReducer";
import { MovieDto } from "../dtos/movie";
import classNames from "classnames";
import ModalComponent from "./ModalComponent";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps, BaseProps } from "../hooks";
class ItemList extends React.Component<BaseProps, {}> {
  constructor(props: BaseProps) {
    super(props);
    this.props.dispatch(getAllMovies);
  }

  render() {
    const homeState: HomeState = this.props.rootState.home;
    const currentPage = homeState.currentPage;
    const itemsPerPage = homeState.itemsPerPage;
    const searchText = homeState.searchText;

    let searchRegex = new RegExp("\\b(" + searchText + ")", "i");
    let movies =
      searchText !== ""
        ? _.filter(
            homeState.movies,
            (movie) => movie.name.match(searchRegex) !== null
          )
        : homeState.movies;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);
    const pageCount = Math.ceil(movies.length / itemsPerPage);
    
    let pageNumberArray = [];
    for (let i = 0; i < pageCount; i++) {
      var pageItemClass = classNames({
        "page-item": true,
        active: currentPage === i + 1,
      });
      pageNumberArray[i] = (
        <li className={pageItemClass}>
          <button
            className="page-link"
            onClick={() => this.props.dispatch(setCurrentPage(i + 1))}
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
          {_.map(itemsPerPageArray, (i) => {
            var itemsPerPageClass = classNames({
              "page-item": true,
              active: itemsPerPage === i,
            });
            return (
              <li className={itemsPerPageClass}>
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
      movies.length > 0 ? (
        <>
          {_.map(currentItems, (movie: any, index: number) => (
            <Item data={movie} itemKey={"item_" + index} />
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
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {_.map(pageNumberArray, (li) => li)}
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
        {itemsPerPageSectionWithSearchbox}
        {itemsSection}
        {paginationSection}
        <ModalComponent
          showModal={false}
          onCloseModal={() => console.log("hello")}
        >
          <div>
            <h3> hell0</h3>
          </div>
        </ModalComponent>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
