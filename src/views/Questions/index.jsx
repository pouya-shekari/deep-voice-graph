import List from "@cmp/Resources/Questions/List";
import React from "react";
import { Helmet } from "react-helmet";

const Questions = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت سوال‌ها</title>
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

export default Questions;
