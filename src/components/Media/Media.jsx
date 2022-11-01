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
const Media = ({ title }) => {
  switch (title) {
    case "Announcement":
      return (
        <Link to={PATHS.ANNOUNCEMENTS}>
          <Card
            className={`${styles.haraCard} ${styles.announcement} border-0`}
          >
            <CardBody className={styles.cardBody}>
              <div className={styles.iconWrapper}>
                <TfiAnnouncement size={30} color={"#fff"} />
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
                <BsQuestionLg size={30} color={"#fff"} />
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
                <GrAction size={30} className={styles.icon} />
              </div>
              <div className={styles.contentWrapper}>
                <h5 className="m-0 text-white">مدیریت عملکردها</h5>
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
                <AiOutlineCheck size={30} color={"#fff"} />
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
                <RiFlowChart size={30} color={"#fff"} />
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

export default Media;
