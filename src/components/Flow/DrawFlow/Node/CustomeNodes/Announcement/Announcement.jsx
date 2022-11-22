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
      <Handle
        type="target"
        position={Position.Top}
        style={{ backgroundColor: "red" }}
      />
      <span>{props.data.label}</span>
        {props.data.waitTime?
            <div>
                <span>زمان انتظار: {props.data.waitTime}ms</span>
            </div> : <></>}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ backgroundColor: "green" }}
      />
    </div>
  );
};

export default Announcement;
