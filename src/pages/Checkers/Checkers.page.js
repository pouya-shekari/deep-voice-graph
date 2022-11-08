import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";

const CheckersWrapper = () => {
  return (
    <>
      <HaraBreadcrumb />
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
