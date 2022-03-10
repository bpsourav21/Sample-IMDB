import {
  MOVIE_REQUEST_LOADING,
  MOVIE_REQUEST_SUCCESS,
  MOVIE_REQUEST_FAIL,
  ON_SELECT_TAB,
} from "../actions/actionTypes";
import { MovieDto } from "../dtos/movie";
import _ from "underscore";

export interface HomeState {
  movies: MovieDto[];
  isLoading: Boolean;
  err: string;
  selectedTab: string;
}

const initialState: HomeState = {
  movies: [],
  isLoading: false,
  err: "",
  selectedTab: "",
};

export const homeReducer = (state: HomeState = initialState, action: any) : HomeState => {
  switch (action.type) {
    case ON_SELECT_TAB:
      return _.assign({}, state, {
        isLoading: false,
        selectedTab: action.payload,
      });
    case MOVIE_REQUEST_LOADING:
      return _.assign({}, state, {
        isLoading: true,
      });
    case MOVIE_REQUEST_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        movies: _.sortBy(action.payload, (movie: MovieDto) => movie.name),
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
