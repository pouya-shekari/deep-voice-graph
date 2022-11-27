import List from "@cmp/Resources/Action/List";
import React from "react";
import { Helmet } from "react-helmet";

const Actions = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت اکشن‌ها</title>
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

export default Actions;
