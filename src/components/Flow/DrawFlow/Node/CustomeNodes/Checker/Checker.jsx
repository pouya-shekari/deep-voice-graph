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
      <Handle
        type="target"
        position={Position.Top}
        style={{ backgroundColor: "red" }}
      />
      <span>{props.data.label}</span>
      <Handle
        type="source"
        id="a"
        position={Position.Right}
        style={{ backgroundColor: "green" }}
      />
      <Handle
        type="source"
        id="b"
        position={Position.Bottom}
        style={{ backgroundColor: "green" }}
      />
    </div>
  );
};

export default Checker;
