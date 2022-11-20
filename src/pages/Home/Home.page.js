import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Media from "../../components/Media/Media";
import List from "../../components/Flow/List";

const HomeWrapper = () => {
  return (
    <>
      {/* <HaraBreadcrumb /> */}
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
            <Media title={"Announcement"} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
            <Media title={"Question"} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
            <Media title={"Action"} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
            <Media title={"Checker"} />
          </div>
          <div className="col-12 mt-5">
            <List />
          </div>
        </div>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <>
      <Helmet>
        <title>پیشخوان</title>
      </Helmet>
      <UserLayout children={<HomeWrapper />} />
    </>
  );
};

export { Home };
