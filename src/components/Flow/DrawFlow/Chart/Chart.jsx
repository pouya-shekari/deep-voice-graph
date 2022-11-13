import React, { useRef, useCallback, useState } from "react";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  ConnectionLineType,
  Controls,
  Background,
  ReactFlowProvider,
  MiniMap,
  addEdge,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";

import Snak from "../../../Snak/Snak";
import Modal from "../../../UI/Modal/Modal";

import getNodeTypes from "../../../../helpers/getNodeTypes";
import GetDefaultEdgeOptions from "../../../../helpers/getDefaultEdgeOptions";
import convertNodeNames from "../../../../helpers/convertNodeNames";

const defaultEdgeOptions = GetDefaultEdgeOptions();
const nodeTypes = getNodeTypes();
const Chart = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [snak, setSnak] = useState({
    message: "",
    type: "",
    open: false,
  });

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
          100 * reactFlowInstance.getZoom(),
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: convertNodeNames(type) },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onconnect = useCallback(
    (params) => setEdges(addEdge({ ...params, type: "smoothstep" }, edges)),
    [setEdges, edges]
  );

  const addResourceHandler = (event, node) => {
    // Can use node type and update data, label, ...
    console.log(node);
    if (node.type === "Start" || node.type === "End") {
      setSnak({
        type: "error",
        message: "افزودن Resource به نقاط شروع و پایان امکان‌پذیر نمی‌باشد.",
        open: true,
      });
      return;
    }
    setShowResourceModal(true);
  };

  const closeModal = () => {
    setShowResourceModal(false);
  };

  const handleSnakClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnak({ ...snak, open: false });
  };

  return (
    <>
      <Snak
        isOpen={snak.open}
        type={snak.type}
        message={snak.message}
        onClose={handleSnakClose}
      />
      <Modal
        open={showResourceModal}
        onClose={closeModal}
        title={"افزودن Resource به Node"}
        actions={[
          { type: "add", label: "افزودن", onClick: () => {} },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
        description={
          " برای افزودن Resource ابتدا آن را جستجو و سپس از لیست نمایش داده شده انتخاب نمایید."
        }
      ></Modal>
      <div className="mt-3">
        <div style={{ height: "100vh", direction: "ltr" }}>
          <ReactFlowProvider>
            <ReactFlow
              nodeTypes={nodeTypes}
              ref={reactFlowWrapper}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              defaultEdgeOptions={defaultEdgeOptions}
              onDrop={dropHandler}
              onDragOver={dragOverHandler}
              onInit={setReactFlowInstance}
              connectionLineType={ConnectionLineType.SmoothStep}
              onConnect={onconnect}
              deleteKeyCode="Delete"
              onNodeDoubleClick={addResourceHandler}
            >
              <Controls />
              <Background />
              <MiniMap />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

export default Chart;
