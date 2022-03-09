import {
  MOVIE_REQUEST_LOADING,
  MOVIE_REQUEST_SUCCESS,
  MOVIE_REQUEST_FAIL,
} from "../actions/actionTypes";
import { MovieDto } from "../dtos/movie";
import _ from "underscore";

export interface HomeState {
  movies: MovieDto[];
  isLoading: Boolean;
  err: string;
}

const initialState: HomeState = {
  movies: [],
  isLoading: false,
  err: "",
};

export const homeReducer = (state: HomeState = initialState, action: any) => {
  switch (action.type) {
    case MOVIE_REQUEST_LOADING:
      return _.assign({}, state, {
        isLoading: true,
      });
    case MOVIE_REQUEST_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        movies: action.payload,
      });
    case MOVIE_REQUEST_FAIL:
      return _.assign({}, state, {
        isLoading: false,
        err: action.payload,
      });
    default:
      return _.assign({}, state);
  }
};
