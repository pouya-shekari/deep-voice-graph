import React from "react";
import { Link } from "react-router-dom";
import styles from "./breadcrumb.module.scss";
import { Breadcrumbs, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import convertBreadcrumbs from "../../helpers/convertBreadcrumbsToPersian.helper";
const HaraBreadcrumb = () => {
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter((x) => x);
  pathnames = pathnames.filter((x) => x !== "flows");
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div>
            <Breadcrumbs aria-label="Hara Breadcrumb" className={styles.hara}>
              {pathnames.length === 0 && (
                <Typography color="text.cancel">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  پیشخوان
                </Typography>
              )}
              {pathnames.length !== 0 && (
                <Link to={"/"}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaraBreadcrumb;
