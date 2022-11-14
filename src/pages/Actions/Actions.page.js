import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { PATHS } from "../../config/routes.config";
import { ActionsList } from "../../components/Actions";

const breadcrumbItems = [
  { title: "پیشخوان", isActive: false, href: PATHS.HOME },
  { title: "مدیریت عملکردها", isActive: true, href: PATHS.ACTINOS },
];

const ActionsWrapper = () => {
  return (
    <>
      <HaraBreadcrumb items={breadcrumbItems} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <ActionsList />
          </div>
        </div>
      </div>
    </>
  );
};

const Actions = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت عملکردها</title>
      </Helmet>
      <UserLayout children={<ActionsWrapper />} />
    </>
  );
};

export { Actions };
