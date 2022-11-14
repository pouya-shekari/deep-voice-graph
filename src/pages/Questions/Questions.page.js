import { Helmet } from "react-helmet";
import { UserLayout } from "../../layouts";
import HaraBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { QuestionsList } from "../../components/Questions";

const QuestionsWrapper = () => {
  return (
    <>
      <HaraBreadcrumb />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12 mb-3">
            <QuestionsList />
          </div>
        </div>
      </div>
    </>
  );
};

const Questions = () => {
  return (
    <>
      <Helmet>
        <title>مدیریت سوال‌ها</title>
      </Helmet>
      <UserLayout children={<QuestionsWrapper />} />
    </>
  );
};

export { Questions };
