const convertFlowToNeo4j = (nodes, edges) => {
  const states = [];
  const endNode = nodes.find((node) => node.type === "End");
  if (endNode) {
    states.push({
      waitTime: 0,
      maxRetry: 0,
      label: endNode.data?.label,
      stateId: endNode.id,
      type: endNode.type,
      meta: JSON.stringify({
        position: { ...endNode.position },
        responses: [...endNode.data.responses],
        allEndNodes: nodes.filter((node) => node.type === "End"),
      }),
      resourceId: 1,
      stateChildren: [],
    });
  }
  nodes.forEach((node) => {
    if (node.type === "End") return;
    const edgs = edges.filter((edg) => edg.source === node.id);
    states.push({
      waitTime: +node.data.waitTime ? +node.data.waitTime : 0,
      maxRetry: +node.data.maxRetry ? +node.data.maxRetry : 0,
      label: node.data?.label,
      stateId: node.id,
      type: node.type,
      meta: JSON.stringify({
        position: { ...node.position },
        responses: [...node.data.responses],
        endNodesId: edgs
          .filter((ed) => ed.targetNodeType === "End")
          .map((el) => ({
            id: el.target,
            label: el.label ? el.label : "",
            sourceId: el.source,
          })),
      }),
      resourceId: node.data.resourceId ? node.data.resourceId : 1,
      stateChildren: edgs.map((edge) => {
        if (edge.targetNodeType === "End") {
          return {
            targetId: endNode.id,
            value: edge.label ? edge.label : "",
          };
        }
        return {
          targetId: edge.target,
          value: edge.label ? edge.label : "",
        };
      }),
    });
  });
  return states;
};

export default convertFlowToNeo4j;
