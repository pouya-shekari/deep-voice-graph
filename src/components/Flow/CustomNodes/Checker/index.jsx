import React from "react";
import { Handle, Position } from "reactflow";
import styles from "@cmp/Flow/CustomNodes/index.module.scss";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
      <div style={{ fontSize: "12px", fontWeight: "bold", color: "crimson" }}>
        {props.data.errors.map((err, index) => (
          <div key={index}>
            <ErrorOutlineIcon fontSize="inherit" sx={{ mr: 0.5 }} />
            <span>{err}</span>
          </div>
        ))}
      </div>
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
