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
  useStore,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [];

const initialEdges = [];
const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: "black" },
  type: "smoothstep",
  labelBgPadding: [8, 4],
  labelBgBorderRadius: 4,
  labelBgStyle: { fill: "#fff", color: "#fff", fillOpacity: 1 },
  labelStyle: { fontSize: 10, fontWeight: 700 },
  markerEnd: {
    type: MarkerType.Arrow,
    color: "black",
    width: 20,
    height: 20,
  },
};
const snapGrid = [20, 20];
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
      console.log(reactFlowBounds);
      console.log(event.clientX);
      console.log(event.clientY);
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      console.log(reactFlowInstance.getZoom());
      const position = reactFlowInstance.project({
        x:
          event.clientX -
          reactFlowBounds.left -
          1650 * reactFlowInstance.getZoom(),
        y: event.clientY - reactFlowBounds.top,
      });
      console.log(position);
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
          panOnScroll={false}
          defaultZoom={1.5}
          snapToGrid={true}
          snapGrid={snapGrid}
          attributionPosition="top-right"
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
