const IsFlowValid = (nodes, edges) => {
  let checkForward = checkForwardNodes(nodes, edges);
  let checkEnd = checkEndNode(nodes, edges);
  let isValid = checkForward[0] && checkEnd[0];
  let errors = [];
  errors.push(checkForward[1]);
  errors.push(checkEnd[1]);
  return [isValid, errors];
};

export default IsFlowValid;

const checkEndNode = (nodes, edges) => {
  let endNodes = nodes.filter((item) => item.type === "End");

  if (endNodes.length !== 0) {
    let endEdges = [];
    let endNodeNotEdge = false;
    endNodes.forEach((item) => {
      if (edges.filter((ele) => ele.target === item.id).length === 0) {
        endNodeNotEdge = true;
      }
      endEdges.push(edges.filter((elem) => elem.target === item.id));
    });
    endEdges = endEdges.flat();

    if (!endNodeNotEdge) {
      let sourceOfEndNodes = [];
      endEdges.forEach((item) => {
        sourceOfEndNodes.push(nodes.filter((elem) => elem.id === item.source));
      });
      sourceOfEndNodes = sourceOfEndNodes.flat();
      let flag = true;
      sourceOfEndNodes.forEach((item) => {
        if (item.type !== "Announcement") {
          flag = false;
        }
      });
      if (flag) {
        return [flag, null];
      } else {
        return [
          flag,
          "به node پایان حتما باید node های از نوع Announcement متصل باشد.",
        ];
      }
    } else {
      return [
        false,
        "به node پایان حتما باید node های از نوع Announcement متصل باشد.",
      ];
    }
  } else {
    return [false, "وجود node پایان الزامی می‌باشد."];
  }
};

const checkForwardNodes = (nodes, edges) => {
  let forwardsNode = nodes.filter((item) => item.type === "Forward");

  if (forwardsNode.length !== 0) {
    let forwardsEdge = [];
    let forwardNodeNotEdge = false;
    forwardsNode.forEach((item) => {
      if (edges.filter((ele) => ele.target === item.id).length === 0) {
        forwardNodeNotEdge = true;
      }
      forwardsEdge.push(edges.filter((elem) => elem.target === item.id));
    });
    forwardsEdge = forwardsEdge.flat();

    if (!forwardNodeNotEdge) {
      let sourceOfForwardsNode = [];
      forwardsEdge.forEach((item) => {
        sourceOfForwardsNode.push(
          nodes.filter((elem) => elem.id === item.source)
        );
      });
      sourceOfForwardsNode = sourceOfForwardsNode.flat();
      let flag = true;
      sourceOfForwardsNode.forEach((item) => {
        if (item.type !== "Announcement") {
          flag = false;
        }
      });
      if (flag) {
        return [flag, null];
      } else {
        return [
          flag,
          "به node ارجاع حتما باید node های از نوع Announcement متصل باشد.",
        ];
      }
    } else {
      return [
        false,
        "به node ارجاع حتما باید node های از نوع Announcement متصل باشد.",
      ];
    }
  } else {
    return [true, null];
  }
};
