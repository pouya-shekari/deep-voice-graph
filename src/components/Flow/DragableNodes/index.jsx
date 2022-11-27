import React from "react";
import { Box } from "@mui/material";
import NODETYPES from "@constants/NODETYPES";
import styles from "./index.module.scss";
import Node from "@cmp/Flow/DragableNodes/Node";
const DragableNodes = () => {
  return (
    <Box className={styles.nodeWrapper} sx={{ mb: 2 }}>
      {NODETYPES.map((node, index) => (
        <Node {...node} key={index} />
      ))}
    </Box>
  );
};

export default DragableNodes;
