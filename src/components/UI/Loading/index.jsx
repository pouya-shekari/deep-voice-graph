import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1.5rem",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
