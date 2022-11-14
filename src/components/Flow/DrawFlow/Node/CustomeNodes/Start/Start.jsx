import React from "react";
import { Handle, Position } from "reactflow";
import styles from "../customenode.module.scss";
const Start = (props) => {
  return (
    <div
      style={{
        backgroundColor: "PaleGoldenRod",
        borderColor: "#daa425",
      }}
      className={styles.flowNode}
    >
      <span>{props.data.label}</span>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ backgroundColor: "green" }}
      />
    </div>
  );
};

export default Start;
