import React from "react";
import { Handle, Position } from "reactflow";
import styles from "../customenode.module.scss";
const End = (props) => {
  return (
    <div
      style={{
        backgroundColor: "Moccasin",
        borderColor: "#865b48",
      }}
      className={styles.flowNode}
    >
      <Handle type="target" position={Position.Top} />
      <span>{props.data.label}</span>
    </div>
  );
};

export default End;
