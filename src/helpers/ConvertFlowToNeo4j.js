const ConvertFlowToNeo4j = (nodes, edges) => {
  return nodes.map((nds) => {
    const edgs = edges.filter((edg) => edg.source === nds.id);
    return {
      waitTime: +nds.data.waitTime ? +nds.data.waitTime : 0,
      label: nds.data?.label,
      stateId: nds.id,
      type: nds.type,
      meta: JSON.stringify({
        position: { ...nds.position },
        responses: [...nds.data.responses],
      }),
      resourceId: nds.data.resourceId ? nds.data.resourceId : 1,
      stateChildren: edgs.map((edge) => ({
        targetId: edge.target,
        value: edge.label ? edge.label : "",
      })),
    };
  });
};

export default ConvertFlowToNeo4j;
