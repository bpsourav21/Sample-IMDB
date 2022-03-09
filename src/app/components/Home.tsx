import classNames from "classnames";
import React, { useEffect, useState } from "react";
import _ from "underscore";
import { selectDefaultTab } from "../actions/homeActions";
import { useAppSelector, useAppDispatch } from "../hooks";
import { HomeState } from "../reducers/homeReducer";
import ItemList from "./ItemList";

const Home = () => {
  const tabItems = ["All Movies", "Trending"];
  const homeState: HomeState = useAppSelector((state) => state.home);
  const selectedTab = homeState.selectedTab;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(() => selectDefaultTab(dispatch, tabItems[0]));
  }, []);
  let tabSection = _.map(tabItems, (tab, index) => {
    var tabClass = classNames({
      tabItem: true,
      active: selectedTab === tab,
    });
    return (
      <div
        className={tabClass}
        key={"tabItem_" + index}
        onClick={() => dispatch(() => selectDefaultTab(dispatch, tab))}
      >
        <h5>{tab}</h5>
      </div>
    );
  });
  return (
    <div className="container home">
      <div className="tabSection">{tabSection}</div>
      <ItemList />
    </div>
  );
};

export default Home;
