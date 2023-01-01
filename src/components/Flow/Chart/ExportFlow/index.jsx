import React, { useState } from "react";
import { Button } from "@mui/material";
import convertFlowToNeo4j from "@utils/convertors/convertFlowToNeo4j";

import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import styles from "./index.module.scss";
import exportFromJSON from "export-from-json";

import GetAppIcon from "@mui/icons-material/GetApp";

const ExportFlow = ({ nodes, edges }) => {
  const [loading, setLoading] = useState(false);

  const exportFlowHandler = async () => {
    setLoading(true);
    const flowStates = convertFlowToNeo4j(nodes, edges);
    const fileName = "flow-states";
    const exportType = exportFromJSON.types.json;
    exportFromJSON({ data: flowStates, fileName, exportType });
    setLoading(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        disabled={loading}
        startIcon={
          !loading ? (
            <GetAppIcon />
          ) : (
            <HourglassBottomIcon className={styles.update} />
          )
        }
        onClick={exportFlowHandler}
      >
        دریافت فلوچارت
      </Button>
    </>
  );
};

export default ExportFlow;
