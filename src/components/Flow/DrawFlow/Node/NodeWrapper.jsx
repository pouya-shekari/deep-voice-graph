import React from "react";
import { Box } from "@mui/material";
import Node from "./DragableNode/Node";
import styles from "./NodeWrapper.module.scss";

const nodeTypes = [
  { title: "شروع", type: "start", bgColor: "PaleGoldenRod" },
  { title: "سوال", type: "question", bgColor: "gold" },
  { title: "اعلان", type: "announcement", bgColor: "skyblue" },
  { title: "عملکرد", type: "action", bgColor: "lightgreen" },
  { title: "چکر", type: "checker", bgColor: "lightgray" },
  { title: "پایان", type: "end", bgColor: "Moccasin" },
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
