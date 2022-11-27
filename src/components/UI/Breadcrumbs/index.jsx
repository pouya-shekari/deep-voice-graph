import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";

import convertBreadcrumbs from "@utils/convertors/convertBreadcrumbsToPersian";

import styles from "./index.module.scss";
import {ConfirmationModal} from "@cmp/UI/Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import PATHS from "@constants/PATHS";
import useModal from "@hooks/useModal";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const modal = useModal();
  let pathnames = location.pathname.split("/").filter((x) => x);
  pathnames = pathnames.filter((x) => x !== "flows");

  const showLogoutModal = () => {
      modal.show({ isExitEditFlowModalOpen: true });
  };
  const closeModalHandler = () => {
      modal.close();
  };

  const exitFlowHandler = () => {
      modal.close();
      navigate(PATHS.HOME);
  };
  return (
    <>
      <Breadcrumbs aria-label="Hara Breadcrumb" className={styles.hara}>
        {pathnames.length === 0 && (
            <Typography color="text.cancel">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              پیشخوان
            </Typography>
        )}
        {(pathnames.length !== 0 && !location.pathname.includes('flows')) && (
            <Link to={"/"}>
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              پیشخوان
            </Link>
        )}
        {(pathnames.length !== 0 && location.pathname.includes('flows')) && (
            <Link onClick={showLogoutModal} >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              پیشخوان
            </Link>
        )}
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return last ? (
              <Typography color="text.cancel" key={to}>
                {convertBreadcrumbs(value)}
              </Typography>
          ) : (
              <Link to={to} key={to}>
                {convertBreadcrumbs(value)}
              </Link>
          );
        })}
      </Breadcrumbs>
      <ConfirmationModal
        label={"return-dashboard-modal"}
        open={modal.modalStates.isExitEditFlowModalOpen}
        title={"آیا قصد بازگشت به صفحه پیشخوان را دارید؟"}
        description={
          "در صورت خروج از فلوچارت، آخرین تغییرات ذخیره شده شما، بازنشانی خواهد شد."
        }
        actions={[
            {
                label:'پیشخوان' ,
                icon: <HomeIcon />,
                type:"error",
                onClickHandler:exitFlowHandler
            },
            {
                label:'انصراف' ,
                icon: <CloseIcon />,
                type: "cancel",
                onClickHandler:closeModalHandler
            }
        ]}
      />
    </>
  );
};

export default Breadcrumb;
