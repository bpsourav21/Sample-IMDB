import {
  MOVIE_REQUEST_LOADING,
  MOVIE_REQUEST_SUCCESS,
  ON_SELECT_TAB,
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
