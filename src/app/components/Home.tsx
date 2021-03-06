import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { selectDefaultTab, setErrorMessage } from "../actions/homeActions";
import {
  mapStateToProps,
  mapDispatchToProps,
  BaseProps,
  updateQueryParams,
} from "../hooks";
import { HomeState, tabItems } from "../reducers/homeReducer";
import ItemList from "./ItemList";

class Home extends React.Component<BaseProps, {}> {
  constructor(props: BaseProps) {
    super(props);
    this.verifyingQueryParams();
  }

  verifyingQueryParams = () => {
    const queryParams = this.props.queryParams;
    let tabName = tabItems[0];
    if (queryParams && queryParams.get("currentTab")) {
      const currentTabParam = _.find(
        tabItems,
        (tab) => tab.toLowerCase() === queryParams.get("currentTab")
      );
      if (currentTabParam) {
        tabName = currentTabParam;
      } else {
        this.props.dispatch(
          setErrorMessage(
            queryParams.get("currentTab") + " is not exist, Set default to All"
          )
        );
      }
    }
    this.selectDefaultTab(tabName);
  };

  selectDefaultTab = (tabName: string): void => {
    this.props.dispatch(selectDefaultTab(tabName));
    updateQueryParams(tabName, this.props.rootState.home.currentPage);
  };

  render() {
    const homeState: HomeState = this.props.rootState.home;
    const selectedTab = homeState.selectedTab;
    let tabSection = _.map(tabItems, (tab, index) => {
      var tabClass = classNames({
        tabItem: true,
        active: selectedTab === tab,
      });
      return (
        <div
          className={tabClass}
          key={"tabItem_" + index}
          onClick={() => this.selectDefaultTab(tab)}
        >
          <h5>{tab}</h5>
        </div>
      );
    });

    const errorBlock = homeState.err !== "" && (
      <div className="alert alert-danger alert-dismissible fade show">
        <h5>
          <strong>Error!</strong>
        </h5>
        <h6>{homeState.err}</h6>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
        ></button>
      </div>
    );

    return (
      <div className="container home">
        {errorBlock}
        <div className="tabSection">{tabSection}</div>
        <ItemList />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
