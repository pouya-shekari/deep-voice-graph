import Header from "@cmp/UI/Header";
import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";

const UserLayout = () => {
  return (
    <Box>
      <Header></Header>
      <Box component="main" sx={{ p: 3, mt: 5 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
