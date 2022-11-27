import React from "react";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styles from "./index.module.scss";

const Reset = ({ onClick, isLoading }) => {
  return (
    <>
      <Button
        variant="contained"
        color="warning"
        startIcon={<RestartAltIcon className={isLoading && styles.reset} />}
        onClick={onClick}
        disabled={isLoading}
      >
        بازنشانی فلوچارت
      </Button>
    </>
  );
};

export default Reset;
