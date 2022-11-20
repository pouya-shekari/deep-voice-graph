import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import List from "../../components/Flow/List";

const FlowsWrapper = () => {
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

const Flows = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت فلوچارت‌ها</title>
      </Helmet>
      <UserLayout children={<FlowsWrapper />} />
    </>
  );
};

export { Flows };
