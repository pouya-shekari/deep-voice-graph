import React from "react";
import { Box } from "@mui/material";
import Node from "./DragableNode/Node";
import styles from "./NodeWrapper.module.scss";

const nodeTypes = [
  { title: "شروع", type: "Start", bgColor: "PaleGoldenRod" },
  { title: "سوال", type: "Question", bgColor: "gold" },
  { title: "اعلان", type: "Announcement", bgColor: "skyblue" },
  { title: "عملکرد", type: "Action", bgColor: "lightgreen" },
  { title: "چکر", type: "Checker", bgColor: "lightgray" },
  { title: "پایان", type: "End", bgColor: "Moccasin" },
];

const NodeWrapper = () => {
  return (
    <Box className={styles.nodeWrapper}>
      {nodeTypes.map((node, index) => (
        <Node key={index} node={node} />
      ))}
    </Box>
  );
};

export default NodeWrapper;
