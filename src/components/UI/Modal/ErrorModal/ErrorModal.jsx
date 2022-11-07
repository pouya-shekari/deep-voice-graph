import React, { Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Transition from "../Transition";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const renderActions = (action) => {
  switch (action.type) {
    case "delete":
      return (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      );
    case "cancel":
      return (
        <Button
          variant="contained"
          color="cancel"
          startIcon={<CloseIcon />}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      );
    default:
      break;
  }
};

const ErrorModal = ({ title, open, onClose, description, actions }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <DialogActions>
            {actions.map((action) => (
              <Fragment key={action.type}>{renderActions(action)}</Fragment>
            ))}
            {/* <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              حذف
            </Button>
            <Button
              variant="contained"
              color="cancel"
              startIcon={<CloseIcon />}
            >
              انصراف
            </Button> */}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ErrorModal;
