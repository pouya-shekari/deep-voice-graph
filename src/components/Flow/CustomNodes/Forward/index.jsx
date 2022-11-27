import React from "react";
import { Handle, Position } from "reactflow";
import styles from "@cmp/Flow/CustomNodes/index.module.scss";

const Forward = (props) => {
  return (
    <div
      style={{
        backgroundColor: "Thistle",
        borderColor: "#6A0DAD",
      }}
      className={styles.flowNode}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ backgroundColor: "red" }}
      />
      <span>{props.data.label}</span>
    </div>
  );
};

export default Forward;
