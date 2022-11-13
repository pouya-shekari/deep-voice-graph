import React, { useLayoutEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import styles from "../customenode.module.scss";
import { v4 as uuidv4 } from "uuid";

const Question = (props) => {
  const nodeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 20, height: 20 });
  useLayoutEffect(() => {
    console.log(nodeRef.current.offsetWidth);
    console.log(nodeRef.current.offsetHeight);
    if (nodeRef.current) {
      setDimensions({
        width: nodeRef.current.offsetWidth + dimensions.width,
        height: nodeRef.current.offsetHeight + dimensions.height,
      });
    }
  }, []);
  const positionHandle = (index) => {
    return (dimensions.height / 5) * index;
  };
  let handles = <></>;
  if (props.data.responses.length === 1) {
    handles = <Handle type="source" position={Position.Bottom} />;
  } else if (props.data.responses.length === 2) {
    handles = (
      <>
        <Handle type="source" id="a" position={Position.Bottom} />
        <Handle type="source" id="b" position={Position.Right} />
      </>
    );
  } else if (props.data.responses.length === 3) {
    handles = (
      <>
        <Handle type="source" id="a" position={Position.Bottom} />
        <Handle type="source" id="b" position={Position.Right} />
        <Handle type="source" id="c" position={Position.Left} />
      </>
    );
  } else {
    handles = props.data.responses.map((response, index) => (
      <Handle
        key={response}
        type="source"
        position={Position.Bottom}
        style={{ left: dimensions.width / 3 + positionHandle(index) }}
        id={response}
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
      ref={nodeRef}
    >
      <Handle type="target" position={Position.Top} />
      <span>{props.data.label}</span>
      {handles}
    </div>
  );
};

export default Question;
