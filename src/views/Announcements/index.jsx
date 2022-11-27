import React from "react";
import { Helmet } from "react-helmet";
import List from "@cmp/Resources/Announcement/List";

const Announcements = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت اعلان‌ها</title>
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

export default Announcements;
