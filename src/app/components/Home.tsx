import classNames from "classnames";
import React, { useState } from "react";
import ItemList from "./ItemList";

const Home = () => {
  const tabItems = ["All Movies", "Trending"];
  const [selectedTab, setSelectedTab] = useState(tabItems[0]);
  let tabSection = tabItems.map((tab, index) => {
    var tabClass = classNames({
      tabItem: true,
      active: selectedTab === tab,
    });
    return (
      <div
        className={tabClass}
        key={"tabItem_" + index}
        onClick={() => setSelectedTab(tab)}
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
