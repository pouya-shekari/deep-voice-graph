import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useSnak from "@hooks/useSnak";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snak = () => {
  const { snak, closeSnak } = useSnak();
  const onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnak();
  };
  return (
    <Snackbar open={snak.open} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={snak.type} sx={{ width: "100%" }} onClose={onClose}>
        {snak.message}
      </Alert>
    </Snackbar>
  );
};

export default Snak;
