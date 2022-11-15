const ConvertFlowFromNeo4j = (flowStates) => {
  console.log(flowStates);
  const nodes = flowStates.map((state) => {
    let tempNode = {
      id: state.stateId,
      type: state.type,
      position: JSON.parse(state.meta),
      data: { label: state.label, responses: [] },
    };
    if (state.relations.length > 0) {
      tempNode.data.responses = state.relations.map((rel) => rel.relationValue);
    }
    return tempNode;
  });

  let edges = [];
  flowStates.forEach((state) => {
    const tempEdges = state.relations.map((rel) => {
      return {
        id: rel.id,
        type: "smoothstep",
        source: state.stateId,
        target: rel.targetState[0].stateId,
        label: rel.relationValue,
        sourceHandle: rel.relationValue,
      };
    });
    edges = [...edges, ...tempEdges];
    console.log(edges);
  });
  console.log(nodes);
  return [nodes, edges];
};

export default ConvertFlowFromNeo4j;
