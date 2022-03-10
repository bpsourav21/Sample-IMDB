import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { selectDefaultTab } from "../actions/homeActions";
import { mapStateToProps, mapDispatchToProps, BaseProps } from "../hooks";
import { HomeState, tabItems } from "../reducers/homeReducer";
import ItemList from "./ItemList";

class Home extends React.Component<BaseProps, {}> {
  constructor(props: BaseProps) {
    super(props);
  }
  selectDefaultTab = (tabName: string): void => {
    this.props.dispatch(selectDefaultTab(tabName));
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

    return (
      <div className="container home">
        <div className="tabSection">{tabSection}</div>
        <ItemList />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
