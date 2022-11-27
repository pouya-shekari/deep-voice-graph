import React from "react";
import { ReactFlowProvider } from "reactflow";
import DragableNodes from "@cmp/Flow/DragableNodes";
import Chart from "@cmp/Flow/Chart";
import { Helmet } from "react-helmet";

const Graph = () => {
  return (
    <>
      <Helmet>
        <title>ویرایش فلوچارت</title>
      </Helmet>
      <ReactFlowProvider>
        <DragableNodes />
        <Chart />
      </ReactFlowProvider>
    </>
  );
};

export default Graph;
