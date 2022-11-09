import { Helmet } from "react-helmet";
import { UserLayout } from "../../../layouts";
import HaraBreadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import List from "../../../components/Flow/List";
import Draw from "../../../components/Flow/DrawFlow/Draw";

const FlowsWrapper = (props) => {
  return (
    <>
      <HaraBreadcrumb />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <Draw {...props} />
          </div>
        </div>
      </div>
    </>
  );
};

const DrawFlow = (props) => {
  return (
    <>
      <Helmet>
        <title>ویرایش فلوچارت</title>
      </Helmet>
      <UserLayout children={<FlowsWrapper {...props} />} />
    </>
  );
};

export { DrawFlow };
