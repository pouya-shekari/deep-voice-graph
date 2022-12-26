import React from "react";
import { Handle, Position } from "reactflow";
import styles from "@cmp/Flow/CustomNodes/index.module.scss";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
        <div style={{ fontSize: "12px", fontWeight: "bold", color: "crimson" }}>
            {props.data.errors.map((err, index) => (
                <div key={index}>
                    <ErrorOutlineIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                    <span>{err}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Forward;
