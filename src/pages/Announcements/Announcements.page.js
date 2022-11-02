import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { PATHS } from "../../config/routes.config";
import List from "../../components/Announcement/List";

const breadcrumbItems = [
  { title: "پیشخوان", isActive: false, href: PATHS.HOME },
  { title: "مدیریت اعلان‌ها", isActive: true, href: PATHS.ANNOUNCEMENTS },
];

const AnnouncementsWrapper = () => {
  return (
    <>
      <HaraBreadcrumb items={breadcrumbItems} />
      <div className="container-fluid mt-4">
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
