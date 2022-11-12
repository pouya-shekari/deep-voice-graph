import React from "react";
import { Handle, Position } from "reactflow";
import styles from "../customenode.module.scss";
const Announcement = (props) => {
  return (
    <div
      style={{
        backgroundColor: "skyblue",
        borderColor: "#0083a3",
      }}
      className={styles.flowNode}
    >
      <Handle type="target" position={Position.Top} />
      <span>{props.data.label}</span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default Announcement;
