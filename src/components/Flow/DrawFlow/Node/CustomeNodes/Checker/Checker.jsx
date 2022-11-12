import React from "react";
import { Handle, Position } from "reactflow";
import styles from "../customenode.module.scss";
const Checker = (props) => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        borderColor: "#36454f",
      }}
      className={styles.flowNode}
    >
      <Handle type="target" position={Position.Top} />
      <span>{props.data.label}</span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default Checker;
