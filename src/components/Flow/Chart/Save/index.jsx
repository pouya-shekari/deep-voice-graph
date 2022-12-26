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
import CloseIcon from "@mui/icons-material/Close";
import {ConfirmationModal} from "@cmp/UI/Modal/ConfirmationModal";
import useModal from "@hooks/useModal";

const Save = ({ nodes, edges, flowId }) => {
  const { showSnak } = useSnak();
    const modal = useModal();

  const [loading, setLoading] = useState(false);

    const confirmationSave = () => {
        modal.show({ isSaveFlowModalOpen: true });
    };

    const saveFlowHandler = () => {
        updateFlowHandler()
        modal.close();
    };

    const closeModalHandler = () => {
        modal.close();
    };

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
        onClick={confirmationSave}
      >
        ذخیره‌ فلوچارت
      </Button>
        <ConfirmationModal
            label={"save-flow-modal"}
            open={modal.modalStates.isSaveFlowModalOpen}
            title={"آیا قصد ذخیره فلوچارت را دارید؟"}
            description={
                "در صورت ذخیره فلوچارت، تغییرات اعمال شده شما ذخیره خواهد شد."
            }
            actions={[
                {
                    label:'ذخیره' ,
                    icon: <SaveIcon />,
                    type:"success",
                    onClickHandler:saveFlowHandler
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

export default Save;
