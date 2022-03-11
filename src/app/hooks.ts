import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const mapStateToProps = (state: RootState) => {
  return {
    rootState: state,
  };
};
export const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    dispatch,
  };
};

export const updateQueryParams = (selectedTab: string, currentPage: number) => {
  let queryParams =
    "?currentTab=" +
    selectedTab.toLowerCase() +
    "&currentPageNum=" +
    currentPage;
  window.history.pushState({}, "", queryParams);
};

export interface BaseProps {
  dispatch: AppDispatch;
  rootState: RootState;
}
