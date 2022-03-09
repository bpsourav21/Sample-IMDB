import {
  MOVIE_REQUEST_LOADING,
  MOVIE_REQUEST_SUCCESS,
  // MOVIE_REQUEST_FAIL,
} from "../actions/actionTypes";

import db from "../helpers/db.json";
// import { AppDispatch } from "../store";

//@ts-ignore
export const getAllMovies = (dispatch) => {
  dispatch({ type: MOVIE_REQUEST_LOADING });
  dispatch({ type: MOVIE_REQUEST_SUCCESS, payload: db.movies });
};
