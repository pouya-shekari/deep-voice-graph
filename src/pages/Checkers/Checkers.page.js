import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import List from "../../components/Checker/List";

const CheckersWrapper = () => {
  return (
    <>
      {/* <HaraBreadcrumb /> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <List />
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
