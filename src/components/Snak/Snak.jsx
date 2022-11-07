import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snak = ({ isOpen, type, message, onClose }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={2000} onClose={onClose}>
      <Alert severity={type} sx={{ width: "100%" }} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snak;
