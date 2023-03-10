import getFlowById from "@services/flows/getFlowById";
import localStorageHelper from "@utils/localStrogeHelper";
import React, { useCallback, useState, useRef, useEffect } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Alert } from "@mui/material";
import Loading from "@cmp/UI/Loading";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useEdgesState,
  useNodesState,
  useUpdateNodeInternals,
  addEdge,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import DEFAULTEDGESOPTIONS from "@constants/DEFAULTEDGESOPTIONS";
import CUSTOMNODETYPES from "@constants/CUSTOMNODETYPES";
import convertNodeNames from "@utils/convertors/convertNodeNames";
import convertFlowFromNeo4j from "@utils/convertors/convertFlowFromNeo4j";
import Save from "@cmp/Flow/Chart/Save";
import useSnak from "@hooks/useSnak";
import allowToAddResource from "@utils/flowValidator/allowToAddResource";
import AddResource from "@cmp/Flow/Chart/AddResource";
import faToEnDigits from "@utils/faToEnDigits";
import Reset from "@cmp/Flow/Chart/Reset";
import Validate from "./Validate";
import ExportFlow from "./ExportFlow";

const Chart = () => {
  const { showSnak } = useSnak();

  const { id } = useParams();
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const updateNodeInternals = useUpdateNodeInternals();

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeToAddResource, setNodeToAddResource] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  let {
    data: flow,
    error: flowError,
    mutate: mutateFlow,
  } = useSWR([`/flow/${id}`, localStorageHelper.load("token")], getFlowById);

  useEffect(() => {
    if (!flow) return;
    const [nodes, edges] = convertFlowFromNeo4j(flow.flowStates);
    setNodes([...nodes]);
    setEdges([...edges]);
  }, [flow, setEdges, setNodes]);

  const dragOverHandler = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const dropNodeHandler = useCallback(
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
        data: { label: convertNodeNames(type), responses: [], errors: [] },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onconnect = useCallback(
    (params) => {
      const sourceId = params.source;
      const targetId = params.target;
      const sourceNode = nodes.find((nds) => nds.id === sourceId);
      const targetNode = nodes.find((nds) => nds.id === targetId);
      if (sourceNode !== targetNode) {
        if (sourceNode.type === "Checker" || sourceNode.type === "Question") {
          return setEdges(
            addEdge(
              {
                ...params,
                type: "smoothstep",
                label: params.sourceHandle,
                targetNodeType: targetNode.type,
                sourceNodeType: sourceNode.type,
              },
              edges
            )
          );
        }
        return setEdges(
          addEdge(
            {
              ...params,
              type: "smoothstep",
              targetNodeType: targetNode.type,
              sourceNodeType: sourceNode.type,
            },
            edges
          )
        );
      }
    },
    [setEdges, edges, nodes]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  const addResourceHandler = (event, node) => {
    if (!allowToAddResource(node.type)) {
      showSnak({
        type: "error",
        message: "???????????? Resource ???? ?????? ?????? ?????????? ???????? ?????????????????.",
      });
      return;
    }
    setNodeToAddResource({ ...node });
  };

  const clearNodeToAddResource = () => {
    setNodeToAddResource(null);
  };

  const updateNode = (value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeToAddResource.id) {
          node.data = {
            ...node.data,
            label: value.resource.label,
            resourceId: value.resource.id,
            waitTime: faToEnDigits(value.waitTime) ?? 0,
            maxRetry: faToEnDigits(value.maxTry) ?? 0,
            errors: [],
            responses: value.resource.responses
              ? [...value.resource.responses]
              : node.data.responses,
          };
        }
        return { ...node };
      })
    );
    let index = nodes.findIndex((node) => node.id === nodeToAddResource.id);
    if (index !== -1) {
      if (nodes[index].type === "Question") {
        const updatedEdges = edges.filter(
          (edge) => edge.source !== nodeToAddResource.id
        );
        setEdges([...updatedEdges]);
      }
    }
    updateNodeInternals(nodeToAddResource.id);
    clearNodeToAddResource();
  };

  const resetFlow = async () => {
    setIsLoading(true);
    try {
      const res = await mutateFlow();
      const [nodes, edges] = convertFlowFromNeo4j(res.flowStates);
      setNodes([...nodes]);
      setEdges([...edges]);
      showSnak({ type: "success", message: "?????????????? ???? ???????????? ???????????????? ????." });
    } catch (error) {
      showSnak({ type: "error", message: "???????????????? ?????????????? ???? ?????? ?????????? ????." });
    }
    setIsLoading(false);
  };

  const updateValidatedNodes = (nodes) => {
    setNodes([...nodes]);
  };
  if (flowError)
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        ???????????? ?????????????? ???? ?????? ?????????? ????! ???????? ?????????? ?????????????? ?????? ???? ?????????? ????????????.
      </Alert>
    );
  if (!flow) return <Loading />;
  return (
    <>
      <div
        aria-label="add new flow"
        className="mb-3 text-start d-flex gap-3 justify-content-between"
      >
        <div className="d-flex gap-3">
          <Validate
            nodes={nodes}
            edges={edges}
            onValidateEnd={updateValidatedNodes}
          />
          <ExportFlow nodes={nodes} edges={edges} />
        </div>
        <div className="d-flex gap-3">
          <Reset onClick={resetFlow} isLoading={isLoading} />
          <Save nodes={nodes} edges={edges} flowId={id} />
        </div>
      </div>
      <AddResource
        selectedNode={nodeToAddResource}
        onClear={clearNodeToAddResource}
        onUpdate={updateNode}
      />
      <div style={{ height: "100vh", direction: "ltr" }}>
        <ReactFlow
          fitView
          nodeTypes={CUSTOMNODETYPES}
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={DEFAULTEDGESOPTIONS}
          onDragOver={dragOverHandler}
          onDrop={dropNodeHandler}
          onInit={setReactFlowInstance}
          connectionLineType={"smoothstep"}
          onConnect={onconnect}
          deleteKeyCode="Delete"
          onNodeDoubleClick={addResourceHandler}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
        >
          <Controls showFitView={false} />
          <Background />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};

export default Chart;
