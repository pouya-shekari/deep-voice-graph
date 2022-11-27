import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Transition from "./Transition";

const Modal = (props) => {
  const { label, title, actions, description, children, open, onClose } = props;
  return (
    <>
      <Dialog
        aria-label={label}
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <div className="py-3">{children}</div>
          <DialogActions>
            {actions.map((action) => (
              <Button
                key={action.label}
                variant="contained"
                color={action.type}
                startIcon={action.icon}
                onClick={action.onClickHandler}
              >
                {action.label}
              </Button>
            ))}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
