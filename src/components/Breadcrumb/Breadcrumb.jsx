import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./breadcrumb.module.scss";
const HaraBreadcrumb = ({ items }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="bg-white py-2 px-3 rounded-1 ">
            <Breadcrumb aria-label="Hara Breadcrumb" className={styles.hara}>
              {items.map(({ title, isActive, href }) => {
                if (isActive) {
                  return (
                    <BreadcrumbItem active key={href}>
                      {title}
                    </BreadcrumbItem>
                  );
                }
                return (
                  <BreadcrumbItem key={href}>
                    <Link to={href}>{title}</Link>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumb>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaraBreadcrumb;
