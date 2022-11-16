const ConvertFlowFromNeo4j = (flowStates) => {
  const nodes = flowStates.map((state) => {
    let tempNode = {
      id: state.stateId,
      type: state.type,
      position: JSON.parse(state.meta).position,
      data: {
        label: state.label,
        responses: [...JSON.parse(state.meta).responses],
      },
    };
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
  });
  return [nodes, edges];
};

export default ConvertFlowFromNeo4j;
