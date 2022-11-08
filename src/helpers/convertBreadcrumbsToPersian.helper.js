import CampaignIcon from "@mui/icons-material/Campaign";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const convertBreadcrumbs = (value) => {
  switch (value) {
    case "announcements":
      return (
        <>
          <CampaignIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          مدیریت اعلان‌ها
        </>
      );
    case "questions":
      return (
        <>
          <QuestionMarkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          مدیریت سوال‌ها
        </>
      );
    default:
      return value;
  }
};

export default convertBreadcrumbs;
