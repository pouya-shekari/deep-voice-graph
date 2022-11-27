import React from "react";
import { Handle, Position } from "reactflow";
import styles from "@cmp/Flow/CustomNodes/index.module.scss";

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
      <br />
      <span>(yes, no)</span>
      <Handle
        type="source"
        id="yes"
        position={Position.Right}
        style={{ backgroundColor: "green" }}
        title="yes"
      />
      <Handle
        type="source"
        id="no"
        position={Position.Bottom}
        style={{ backgroundColor: "green" }}
        title="no"
      />
    </div>
  );
};

export default Checker;
