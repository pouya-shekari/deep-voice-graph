import React from "react";
import { Card, CardBody } from "reactstrap";
import { TfiAnnouncement } from "react-icons/tfi";
import { BsQuestionLg } from "react-icons/bs";
import { GrAction } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import { RiFlowChart } from "react-icons/ri";
import styles from "./media.module.scss";
import { Link } from "react-router-dom";
import { PATHS } from "../../config/routes.config";

import CampaignIcon from "@mui/icons-material/Campaign";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import CheckIcon from "@mui/icons-material/Check";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const Media = ({ title }) => {
  const renderMedia = (value) => {
    switch (value) {
      case "Announcement":
        return (
          <Link to={PATHS.ANNOUNCEMENTS}>
            <Card
              className={`${styles.haraCard} ${styles.announcement} border-0`}
            >
              <CardBody className={styles.cardBody}>
                <div className={styles.iconWrapper}>
                  <CampaignIcon fontSize="large" />
                </div>
                <div className={styles.contentWrapper}>
                  <h5 className="m-0 text-white">مدیریت اعلان‌ها</h5>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      case "Question":
        return (
          <Link to={PATHS.QUESTIONS}>
            <Card className={`${styles.haraCard} ${styles.question} border-0`}>
              <CardBody className={styles.cardBody}>
                <div className={styles.iconWrapper}>
                  <QuestionMarkIcon fontSize="large" />
                </div>
                <div className={styles.contentWrapper}>
                  <h5 className="m-0 text-white">مدیریت سوال‌ها</h5>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      case "Action":
        return (
          <Link to={PATHS.ACTINOS}>
            <Card className={`${styles.haraCard} ${styles.action} border-0`}>
              <CardBody className={styles.cardBody}>
                <div className={styles.iconWrapper}>
                  <SettingsInputComponentIcon fontSize="large" />
                </div>
                <div className={styles.contentWrapper}>
                  <h5 className="m-0 text-white">مدیریت اکشن‌ها</h5>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      case "Checker":
        return (
          <Link to={PATHS.CHECKERS}>
            <Card className={`${styles.haraCard} ${styles.checker} border-0`}>
              <CardBody className={styles.cardBody}>
                <div className={styles.iconWrapper}>
                  <CheckIcon fontSize="large" />
                </div>
                <div className={styles.contentWrapper}>
                  <h5 className="m-0 text-white">مدیریت چکرها</h5>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      case "Flow":
        return (
          <Link to={PATHS.FLOWS}>
            <Card className={`${styles.haraCard} ${styles.flow} border-0`}>
              <CardBody className={styles.cardBody}>
                <div className={styles.iconWrapper}>
                  <AccountTreeIcon fontSize="large" />
                </div>
                <div className={styles.contentWrapper}>
                  <h5 className="m-0 text-white">مدیریت فلوچارت‌ها</h5>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      default:
        break;
    }
  };

  return <div className={styles.hara}>{renderMedia(title)}</div>;
};

export default Media;
