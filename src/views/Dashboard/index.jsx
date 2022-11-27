import React from "react";
import { Helmet } from "react-helmet";

import ITEMS from "@constants/OVERVIEWITEMS";
import OverviewCard from "@cmp/OverviewCard";
import List from "@cmp/Flow/List";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>پیشخوان</title>
      </Helmet>
      <div className="container-fluid p-0">
        <div className="row">
          {ITEMS.map((item) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3"
              key={item.title}
            >
              <OverviewCard {...item} />
            </div>
          ))}
          <div className="col-12 mt-3">
            <List />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
