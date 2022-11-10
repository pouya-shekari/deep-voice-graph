import React, { useRef, useCallback, useState } from "react";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  MarkerType,
  ConnectionLineType,
  Controls,
  Background,
  ReactFlowProvider,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
const initialNodes = [];
const initialEdges = [];
const Chart = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const dragOverHandler = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const dropHandler = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x:
          event.clientX -
          reactFlowBounds.left -
          1650 * reactFlowInstance.getZoom(),
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: Math.random().toString(),
        type: "default",
        position,
        data: { label: type },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );
  return (
    <div className="mt-3">
      <div style={{ height: "100vh" }}>
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onInit={setReactFlowInstance}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Controls showFitView={false} />
          <Background />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Chart;
