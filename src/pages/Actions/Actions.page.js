import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { PATHS } from "../../config/routes.config";
import { ActionsList } from "../../components/Actions";

const ActionsWrapper = () => {
  return (
    <>
      {/* <HaraBreadcrumb /> */}
      <div className="container-fluid">
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
        <title>مدیریت اکشن‌ها</title>
      </Helmet>
      <UserLayout children={<ActionsWrapper />} />
    </>
  );
};

export { Actions };
