import React, { Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Transition from "./Transition";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

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
    case "add":
      return (
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      );
    case "edit":
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      );
    default:
      break;
  }
};

const Modal = ({ title, open, onClose, actions, description, children }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <div className="py-3">{children}</div>
          <DialogActions>
            {actions.map((action) => (
              <Fragment key={action.type}>{renderActions(action)}</Fragment>
            ))}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
