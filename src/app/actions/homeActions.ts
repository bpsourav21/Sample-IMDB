import _ from "underscore";
import {
  MOVIE_REQUEST_FAIL,
  MOVIE_REQUEST_LOADING,
  MOVIE_REQUEST_SUCCESS,
  ON_CONTROL_MODAL,
  ON_SEARCH_TEXT,
  ON_SELECT_TAB,
  SET_ERROR_MESSAGE,
  SET_ITEMS_PER_PAGE,
  SET_MOVIE_FOR_MODAL,
  SET_PAGE_NUMBER,
  // MOVIE_REQUEST_FAIL,
} from "../actions/actionTypes";

import db from "../helpers/db.json";
import { MovieDto } from "../models/movie";
import { tabItems } from "../reducers/homeReducer";
import { AppDispatch } from "../store";

export const selectDefaultTab = (selectedTab: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ON_SELECT_TAB, payload: selectedTab });
    if (selectedTab === tabItems[0]) {
      dispatch(getAllMovies());
    } else {
      dispatch(getAllTrendingMovies());
    }
  };
};

export const getAllMovies = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MOVIE_REQUEST_LOADING });

    const dbPromise = new Promise<MovieDto[]>((resolve, reject) => {
      setTimeout(() => {
        const sortedMovie: MovieDto[] = _.sortBy(
          db.movies,
          (movie: MovieDto) => movie.name
        );
        resolve(sortedMovie);
      }, 100);
    });

    dbPromise
      .then((res: MovieDto[]) => {
        dispatch({ type: MOVIE_REQUEST_SUCCESS, payload: res });
      })
      .catch((e) => {
        dispatch({ type: MOVIE_REQUEST_FAIL, payload: e });
      });
  };
};

export const getAllTrendingMovies = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MOVIE_REQUEST_LOADING });

    const dbPromise = new Promise<MovieDto[]>((resolve, reject) => {
      setTimeout(() => {
        const sortedTrendingMovie: MovieDto[] = _.sortBy(
          _.filter(db.movies, (movie) => movie.imdbRating > 8),
          (movie: MovieDto) => movie.releaseYear
        ).reverse();
        resolve(sortedTrendingMovie);
      }, 1200);
    });

    dbPromise
      .then((res: MovieDto[]) => {
        dispatch({ type: MOVIE_REQUEST_SUCCESS, payload: res });
      })
      .catch((e) => {
        dispatch({ type: MOVIE_REQUEST_FAIL, payload: e });
      });
  };
};

export const selectMovie = (movie: MovieDto) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ON_CONTROL_MODAL, payload: true });
    dispatch({ type: SET_MOVIE_FOR_MODAL, payload: movie });
  };
};

export const onCloseModal = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ON_CONTROL_MODAL, payload: false });
    dispatch({ type: SET_MOVIE_FOR_MODAL, payload: undefined });
  };
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

export const setErrorMessage = (errMsg: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: SET_ERROR_MESSAGE, payload: errMsg });
    setTimeout(() => {
      dispatch({ type: SET_ERROR_MESSAGE, payload: "" });
    }, 5000);
  };
};
