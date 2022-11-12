import React from "react";
import { Handle, Position } from "reactflow";
import styles from "../customenode.module.scss";
const Question = (props) => {
  return (
    <div
      style={{
        backgroundColor: "gold",
        borderColor: "#daa425",
      }}
      className={styles.flowNode}
    >
      <Handle type="target" position={Position.Top} />
      <span>{props.data.label}</span>
      <Handle type="source" id="a" position={Position.Left} />
      <Handle type="source" id="c" position={Position.Bottom} />
      <Handle type="source" id="b" position={Position.Right} />
    </div>
  );
};

export default Question;
