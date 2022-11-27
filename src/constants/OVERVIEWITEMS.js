import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import CheckIcon from "@mui/icons-material/Check";
import CampaignIcon from "@mui/icons-material/Campaign";

import PATHS from "./PATHS";

const ITEMS = [
  {
    icon: <CampaignIcon fontSize="large" />,
    title: "مدیریت اعلان‌ها",
    path: PATHS.ANNOUNCEMENTS,
    style: "announcement",
  },
  {
    icon: <QuestionMarkIcon fontSize="large" />,
    title: "مدیریت سوال‌ها",
    path: PATHS.QUESTIONS,
    style: "question",
  },
  {
    icon: <SettingsInputComponentIcon fontSize="large" />,
    title: "مدیریت اکشن‌ها",
    path: PATHS.ACTIONS,
    style: "action",
  },
  {
    icon: <CheckIcon fontSize="large" />,
    title: "مدیریت چکرها",
    path: PATHS.CHECKERS,
    style: "checker",
  },
];

export default ITEMS;
