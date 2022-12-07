import React from "react";
import { Handle, Position } from "reactflow";
import styles from "@cmp/Flow/CustomNodes/index.module.scss";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
        position={Position.Bottom}
        style={{ backgroundColor: "green" }}
      />
    </div>
  );
};

export default Start;
