import React from "react";

import { Card, CardContent } from "@mui/material";

import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const OverviewCard = ({ title, path, icon, style }) => {
  return (
    <div className={styles.hara}>
      <Link to={path}>
        <Card className={`${styles.haraCard} border-0`} data-id={style}>
          <CardContent className={styles.cardBody}>
            <div className={styles.iconWrapper}>{icon}</div>
            <div className={styles.contentWrapper}>
              <h5 className="m-0 text-white">{title}</h5>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default OverviewCard;
