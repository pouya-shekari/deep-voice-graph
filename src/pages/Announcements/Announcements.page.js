import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import List from "../../components/Announcement/List";

const AnnouncementsWrapper = () => {
  return (
    <>
      {/* <HaraBreadcrumb /> */}
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

const Announcements = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت اعلان‌ها</title>
      </Helmet>
      <UserLayout children={<AnnouncementsWrapper />} />
    </>
  );
};

export { Announcements };
