import List from "@cmp/Resources/Checker/List";
import React from "react";
import { Helmet } from "react-helmet";

const Checkers = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت چکرها</title>
      </Helmet>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkers;
