import React, { useState } from "react";
import { Button } from "@mui/material";
import convertFlowToNeo4j from "@utils/convertors/convertFlowToNeo4j";
import updateFlowStates from "@services/flows/updateFlowStates";
import localStorageHelper from "@utils/localStrogeHelper";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./index.module.scss";
import useSnak from "@hooks/useSnak";
import IsFlowValid from "@utils/flowValidator/IsFlowValid";

const Save = ({ nodes, edges, flowId }) => {
  const { showSnak } = useSnak();

  const [loading, setLoading] = useState(false);
  const updateFlowHandler = async () => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    const [isValid, errors] = IsFlowValid(nodes, edges);
    if (isValid) {
      const flowStates = convertFlowToNeo4j(nodes, edges);
      try {
        await updateFlowStates(
          `/flow/update/states`,
          localStorageHelper.load("token"),
          {
            flowId: flowId,
            flowStates,
          }
        );
        showSnak({ type: "success", message: "فلوچارت با موفقیت به روز شد." });
      } catch (error) {
        showSnak({
          type: "error",
          message: "بروزرسانی فلوچارت با خطا مواجه شد.",
        });
      }
    } else {
      console.log(errors);
      showSnak({
        type: "error",
        message: errors[0] || errors[1],
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="success"
        disabled={loading}
        startIcon={
          !loading ? (
            <SaveIcon />
          ) : (
            <HourglassBottomIcon className={styles.update} />
          )
        }
        onClick={updateFlowHandler}
      >
        ذخیره‌ فلوچارت
      </Button>
    </>
  );
};

export default Save;
