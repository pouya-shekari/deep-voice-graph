import React from "react";
import useSWR from "swr";
import { BASE_URL } from "../../../config/variables.config";
import { getFlow } from "../../../api/flow.api";
import { Alert, Box, CircularProgress } from "@mui/material";
import NodeWrapper from "./Node/NodeWrapper";
import Chart from "./Chart/Chart";
import { ReactFlowProvider } from "reactflow";
const getFlowHandler = async (url) => {
  const { data } = await getFlow(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

const DrawWrapper = (props) => {
  const { data, error, mutate } = useSWR(
    `${BASE_URL}/flow/${props.params.id}`,
    getFlowHandler,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) {
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  }
  if (!data) {
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
  }
  return (
    <ReactFlowProvider>
      <NodeWrapper />
      <Chart flow={data} />
    </ReactFlowProvider>
  );
};

export default DrawWrapper;
