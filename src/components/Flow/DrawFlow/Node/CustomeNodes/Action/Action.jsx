import React from "react";
import { Handle, Position } from "reactflow";
import styles from "../customenode.module.scss";
const Action = (props) => {
  return (
    <div
      style={{
        backgroundColor: "lightgreen",
        borderColor: "#228b22",
      }}
      className={styles.flowNode}
    >
      <Handle type="target" position={Position.Top} />
      <span>{props.data.label}</span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default Action;
