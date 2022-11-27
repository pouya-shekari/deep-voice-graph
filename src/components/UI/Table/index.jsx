import React from "react";
import Simple from "./Simple";
import WithCollapseRow from "./WithCollapseRow";

const Table = ({ type, ...others }) => {
  switch (type) {
    case "simple":
      return <Simple {...others} />;
    case "with-collapse":
      return <WithCollapseRow {...others} />;
    default:
      break;
  }
};

export default Table;
