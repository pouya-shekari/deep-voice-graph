import { v4 as uuidv4 } from "uuid";

const convertFlowFromNeo4j = (flowStates) => {
  const nodes = [];
  flowStates.forEach((state) => {
    if (state.type === "End") {
      const allEndNodes = JSON.parse(state.meta).allEndNodes;
      allEndNodes.forEach((node) => {
        nodes.push({
          id: node.id,
          type: node.type,
          position: { ...node.position },
          data: { ...node.data },
        });
      });
    }
    nodes.push({
      id: state.stateId,
      type: state.type,
      position: JSON.parse(state.meta).position,
      data: {
        label: state.label,
        waitTime: state.waitTime,
        responses: [...JSON.parse(state.meta).responses],
        resourceId: state.resourceId,
        errors: [...[]],
      },
    });
  });
  let edges = [];
  flowStates.forEach((state) => {
    const tempEdges = [];
    state.relations.forEach((rel) => {
      if (
        flowStates.find((sts) => sts.stateId === rel.targetState[0].stateId)
          .type !== "End"
      ) {
        tempEdges.push({
          id: rel.id,
          type: "smoothstep",
          source: state.stateId,
          target: rel.targetState[0].stateId,
          label: rel.relationValue,
          sourceHandle: rel.relationValue,
          sourceNodeType: state.type,
          targetNodeType: flowStates.find(
            (sts) => sts.stateId === rel.targetState[0].stateId
          ).type,
        });
      }
    });
    const endNodesId = JSON.parse(state.meta).endNodesId;
    if (endNodesId) {
      endNodesId.forEach((endNode) => {
        tempEdges.push({
          id: uuidv4(),
          type: "smoothstep",
          source: state.stateId,
          target: endNode.id,
          label: endNode.label,
          sourceHandle: endNode.label,
          sourceNodeType: state.type,
          targetNodeType: "End",
        });
      });
    }
    edges = [...edges, ...tempEdges];
  });
  return [nodes, edges];
};

export default convertFlowFromNeo4j;
