import React from "react";
import useSWR from "swr";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import Transition from "../ModalTransition/Transition";

const AddDialog = ({ open, closeHandler }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Dialog
        open={open}
        onClose={closeHandler}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
      >
        <p>Mohamad</p>
      </Dialog>
    </>
  );
};

export default AddDialog;
