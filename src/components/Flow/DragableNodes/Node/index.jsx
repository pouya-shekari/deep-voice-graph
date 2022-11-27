import React from "react";
import styles from "./index.module.scss";
const Node = ({ bgColor, type, title, borderColor }) => {
  const dragStartHadler = (event, nodeType) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/reactflow", nodeType);
  };
  return (
    <div
      className={styles.node}
      style={{ backgroundColor: `${bgColor}`, borderColor }}
      draggable={true}
      onDragStart={(event) => dragStartHadler(event, type)}
    >
      <span>{title}</span>
    </div>
  );
};

export default Node;
