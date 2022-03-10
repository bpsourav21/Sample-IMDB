import {
  MOVIE_REQUEST_LOADING,
  MOVIE_REQUEST_SUCCESS,
  ON_SEARCH_TEXT,
  ON_SELECT_TAB,
  SET_ITEMS_PER_PAGE,
  SET_PAGE_NUMBER,
  // MOVIE_REQUEST_FAIL,
} from "../actions/actionTypes";

import db from "../helpers/db.json";
import { AppDispatch } from "../store";

export const selectDefaultTab = (selectedTab: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ON_SELECT_TAB, payload: selectedTab });
  };
};

export const getAllMovies = (dispatch: AppDispatch) => {
  dispatch({ type: MOVIE_REQUEST_LOADING });
  dispatch({ type: MOVIE_REQUEST_SUCCESS, payload: db.movies });
};

export const setCurrentPage = (pageNumber: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: SET_PAGE_NUMBER, payload: pageNumber });
  };
};
export const setItemsPerPage = (itemsPerPage: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: SET_ITEMS_PER_PAGE, payload: itemsPerPage });
  };
};
export const setSearchText = (searchText: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ON_SEARCH_TEXT, payload: searchText });
  };
};
