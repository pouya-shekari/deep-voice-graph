import React from "react";
import styles from "./Node.module.scss";
const Node = ({ node }) => {
  const dragStartHadler = (event, nodeType) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/reactflow", nodeType);
  };
  return (
    <div
      className={styles.node}
      style={{ backgroundColor: `${node.bgColor}` }}
      draggable={true}
      onDragStart={(event) => dragStartHadler(event, node.type)}
    >
      <span>{node.title}</span>
    </div>
  );
};

export default Node;
