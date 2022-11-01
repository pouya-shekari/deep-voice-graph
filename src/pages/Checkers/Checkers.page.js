import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { PATHS } from "../../config/routes.config";

const breadcrumbItems = [
  { title: "پیشخوان", isActive: false, href: PATHS.HOME },
  { title: "مدیریت چکرها", isActive: true, href: PATHS.CHECKERS },
];

const CheckersWrapper = () => {
  return (
    <>
      <HaraBreadcrumb items={breadcrumbItems} />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
            <h1>Checkers</h1>
          </div>
        </div>
      </div>
    </>
  );
};

const Checkers = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت چکرها</title>
      </Helmet>
      <UserLayout children={<CheckersWrapper />} />
    </>
  );
};

export { Checkers };
