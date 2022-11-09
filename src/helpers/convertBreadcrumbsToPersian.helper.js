import CampaignIcon from "@mui/icons-material/Campaign";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import CheckIcon from "@mui/icons-material/Check";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

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
    case "actions":
      return (
        <>
          <SettingsInputComponentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          مدیریت عملکردها
        </>
      );
    case "checkers":
      return (
        <>
          <CheckIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          مدیریت چکرها
        </>
      );
    case "flows":
      return (
        <>
          <AccountTreeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          مدیریت فلوچارت‌ها
        </>
      );
    default:
      return <>ویرایش فلوچارت</>;
  }
};

export default convertBreadcrumbs;
