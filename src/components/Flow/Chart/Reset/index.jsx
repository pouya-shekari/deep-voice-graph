import React from "react";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styles from "./index.module.scss";
import {ConfirmationModal} from "@cmp/UI/Modal/ConfirmationModal";
import CloseIcon from "@mui/icons-material/Close";
import useModal from "@hooks/useModal";

const Reset = ({ onClick, isLoading }) => {
    const modal = useModal();

    const confirmationReset = () => {
        modal.show({ isResetFlowModalOpen: true });
    };

    const resetFlowHandler = () => {
        onClick()
        modal.close();
    };

    const closeModalHandler = () => {
        modal.close();
    };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        startIcon={<RestartAltIcon className={isLoading && styles.reset} />}
        onClick={confirmationReset}
        disabled={isLoading}
      >
        بازنشانی فلوچارت
      </Button>
        <ConfirmationModal
            label={"reset-flow-modal"}
            open={modal.modalStates.isResetFlowModalOpen}
            title={"آیا قصد بازنشانی فلوچارت را دارید؟"}
            description={
                "در صورت بازنشانی فلوچارت، آخرین تغییرات ذخیره شده شما، بازنشانی خواهد شد."
            }
            actions={[
                {
                    label:'بازنشانی' ,
                    icon: <RestartAltIcon />,
                    type:"error",
                    onClickHandler:resetFlowHandler
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

export default Reset;
