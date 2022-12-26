import React from "react";
import { Handle, Position } from "reactflow";
import styles from "@cmp/Flow/CustomNodes/index.module.scss";

import { v4 as uuidv4 } from "uuid";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Question = (props) => {
  const positionHandle = (index) => {
    if (index % 2) {
      return `calc(50% + ${(index - 1) * 15}px)`;
    }
    return `calc(50% - ${index * 15}px)`;
  };
  let handles = <></>;
  if (props.data.responses.length === 1) {
    handles = (
      <Handle
        type="source"
        id={props.data.responses[0]}
        title={props.data.responses[0]}
        position={Position.Bottom}
      />
    );
  } else if (props.data.responses.length === 2) {
    handles = (
      <>
        <Handle
          type="source"
          id={props.data.responses[0]}
          title={props.data.responses[0]}
          position={Position.Bottom}
          style={{ backgroundColor: "green" }}
        />
        <Handle
          type="source"
          id={props.data.responses[1]}
          title={props.data.responses[1]}
          position={Position.Right}
          style={{ backgroundColor: "green" }}
        />
      </>
    );
  } else if (props.data.responses.length === 3) {
    handles = (
      <>
        <Handle
          type="source"
          id={props.data.responses[0]}
          title={props.data.responses[0]}
          position={Position.Bottom}
          style={{ backgroundColor: "green" }}
        />
        <Handle
          type="source"
          id={props.data.responses[1]}
          title={props.data.responses[1]}
          position={Position.Right}
          style={{ backgroundColor: "green" }}
        />
        <Handle
          type="source"
          id={props.data.responses[2]}
          title={props.data.responses[2]}
          position={Position.Left}
          style={{ backgroundColor: "green" }}
        />
      </>
    );
  } else if (props.data.responses.length === 4) {
    handles = (
      <>
        <Handle
          type="source"
          id={props.data.responses[0]}
          title={props.data.responses[0]}
          position={Position.Bottom}
          style={{ backgroundColor: "green", left: `calc(50% - 15px)` }}
        />
        <Handle
          type="source"
          id={props.data.responses[1]}
          title={props.data.responses[1]}
          position={Position.Bottom}
          style={{ backgroundColor: "green", left: `calc(50% + 15px)` }}
        />
        <Handle
          type="source"
          id={props.data.responses[2]}
          title={props.data.responses[2]}
          position={Position.Right}
          style={{ backgroundColor: "green" }}
        />
        <Handle
          type="source"
          id={props.data.responses[3]}
          title={props.data.responses[3]}
          position={Position.Left}
          style={{ backgroundColor: "green" }}
        />
      </>
    );
  } else {
    handles = props.data.responses.map((response, index) => (
      <Handle
        key={uuidv4()}
        type="source"
        position={Position.Bottom}
        style={{
          left: positionHandle(index),
          backgroundColor: "green",
        }}
        id={response}
        title={response}
      />
    ));
  }

  return (
    <div
      style={{
        backgroundColor: "gold",
        borderColor: "#daa425",
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
      {props.data.responses.length > 0 && (
        <span>({props.data.responses.join(", ")})</span>
      )}
      {handles}
      {props.data.waitTime ? (
        <div>
          <span>زمان انتظار: {props.data.waitTime}ms</span>
        </div>
      ) : (
        <></>
      )}
        {props.data.errors.length!==0 ? (
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "crimson" }}>
                {props.data.errors.map((err, index) => (
                    <div key={index}>
                        <ErrorOutlineIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                        <span>{err}</span>
                    </div>
                ))}
            </div>
        ) : (
            <></>
        )}
    </div>
  );
};

export default Question;
