import {
  MOVIE_REQUEST_LOADING,
  MOVIE_REQUEST_SUCCESS,
  MOVIE_REQUEST_FAIL,
  ON_SELECT_TAB,
  SET_PAGE_NUMBER,
  ON_SEARCH_TEXT,
  SET_ITEMS_PER_PAGE,
  SET_MOVIE_FOR_MODAL,
  ON_CONTROL_MODAL,
  SET_ERROR_MESSAGE,
} from "../actions/actionTypes";
import { MovieDto } from "../models/movie";

export interface HomeState {
  movies: MovieDto[];
  isLoading: Boolean;
  err: string;
  selectedTab: string;
  currentPage: number;
  itemsPerPage: number;
  searchText: string;
  selectedMovie: MovieDto | undefined;
  showModal: boolean;
}

export const itemsPerPageArray: number[] = [25, 50, 200];
export const tabItems: string[] = ["All", "Trending"];

const initialState: HomeState = {
  movies: [],
  isLoading: false,
  err: "",
  selectedTab: tabItems[0],
  currentPage: 1,
  itemsPerPage: itemsPerPageArray[0],
  searchText: "",
  selectedMovie: undefined,
  showModal: false,
};

export const homeReducer = (
  state: HomeState = initialState,
  action: any
): HomeState => {
  switch (action.type) {
    case ON_SELECT_TAB:
      return {
        ...state,
        isLoading: false,
        selectedTab: action.payload,
      };
    case MOVIE_REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case MOVIE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        movies: action.payload,
      };
    case MOVIE_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload,
      };
    case ON_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    case SET_MOVIE_FOR_MODAL:
      return {
        ...state,
        selectedMovie: action.payload,
      };
    case ON_CONTROL_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};
