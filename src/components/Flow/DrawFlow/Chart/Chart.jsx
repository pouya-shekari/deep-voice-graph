import React, { useRef, useCallback, useState, useEffect } from "react";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  ConnectionLineType,
  Controls,
  Background,
  MiniMap,
  addEdge,
  updateEdge,
  useUpdateNodeInternals,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";

import { Autocomplete, Button, TextField } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import Snak from "../../../Snak/Snak";
import Modal from "../../../UI/Modal/Modal";

import getNodeTypes from "../../../../helpers/getNodeTypes";
import GetDefaultEdgeOptions from "../../../../helpers/getDefaultEdgeOptions";
import convertNodeNames from "../../../../helpers/convertNodeNames";
import { getAnnouncements } from "../../../../api/announcement.api";
import { getQuestion } from "../../../../api/question.api";
import { getActions } from "../../../../api/actions.api";
import { getCheckers } from "../../../../api/checker.api";
import IsFlowValid from "../../../../helpers/isFlowValid";
import ConvertFlowToNeo4j from "../../../../helpers/ConvertFlowToNeo4j";
import { updateFlow } from "../../../../api/flows.api";
import { APPLICATIONID, BASE_URL } from "../../../../config/variables.config";
import ConvertFlowFromNeo4j from "../../../../helpers/ConvertFlowFromNeo4j";

import styles from "./chart.module.scss";
import {toast} from "react-toastify";

const defaultEdgeOptions = GetDefaultEdgeOptions();
const nodeTypes = getNodeTypes();
const Chart = ({ flow }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [availableResources, setAvailableResources] = useState([]);
  const [updateResourcesFlag, setUpdateResourcesFlag] = useState(false);
  const [nodeType, setNodeType] = useState("");
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snak, setSnak] = useState({
    message: "",
    type: "",
    open: false,
  });
  const dragOverHandler = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  useEffect(() => {
    const [nodes, edges] = ConvertFlowFromNeo4j(flow.flowStates);
    setNodes([...nodes]);
    setEdges([...edges]);
  }, [flow.flowStates, setEdges, setNodes]);
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
        data: { label: convertNodeNames(type), responses: [] },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onconnect = useCallback(
    (params) => {
      const sourceId = params.source;
      const sourceNode = nodes.find((nds) => nds.id === sourceId);
      if (sourceNode.type === "Checker" || sourceNode.type === "Question") {
        return setEdges(
          addEdge(
            { ...params, type: "smoothstep", label: params.sourceHandle },
            edges
          )
        );
      }
      return setEdges(addEdge({ ...params, type: "smoothstep" }, edges));
    },
    [setEdges, edges, nodes]
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addResourceHandler = (event, node) => {
    setSelectedNodeId(node.id);
    if (
      node.type === "Start" ||
      node.type === "End" ||
      node.type === "Forward"
    ) {
      setSnak({
        type: "error",
        message:
          "افزودن Resource به نقاط شروع، پایان و ارجاع امکان‌پذیر نمی‌باشد.",
        open: true,
      });
      return;
    }
    setNodeType(node.type);
    setUpdateResourcesFlag(!updateResourcesFlag);
    setShowResourceModal(true);
  };

  useEffect(() => {
    switch (nodeType) {
      case "Announcement":
        getAnnouncements("/announcement/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            applicationId: APPLICATIONID,
            isQuestion: false,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({
                label: item.text,
                id: item.announcementId,
                responses: item.responses ? [...item.responses] : [],
              });
            });
            setAvailableResources(options);
          })
          .catch(() => {
            setSnak({
              type: "error",
              message: "دریافت Resource با خطا مواجه شد.",
              open: true,
            });
          });
        break;

      case "Question":
        getQuestion({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            applicationId: APPLICATIONID,
            isQuestion: true,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({
                label: item.text,
                id: item.announcementId,
                responses: [...item.responses],
              });
            });
            setAvailableResources(options);
          })
          .catch(() => {
            setSnak({
              type: "error",
              message: "دریافت Resource با خطا مواجه شد.",
              open: true,
            });
          });
        break;

      case "Action":
        getActions({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            applicationId: APPLICATIONID,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({
                label: item.text,
                id: item.actionId,
                responses: item.responses ? [...item.responses] : [],
              });
            });
            setAvailableResources(options);
          })
          .catch(() => {
            setSnak({
              type: "error",
              message: "دریافت Resource با خطا مواجه شد.",
              open: true,
            });
          });
        break;

      case "Checker":
        getCheckers("/checker/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            applicationId: APPLICATIONID,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({
                label: item.text,
                id: item.checkerId,
                responses: item.responses ? [...item.responses] : [],
              });
            });
            setAvailableResources(options);
          })
          .catch(() => {
            setSnak({
              type: "error",
              message: "دریافت Resource با خطا مواجه شد.",
              open: true,
            });
          });
        break;
      default:
        return;
    }
  }, [updateResourcesFlag, nodeType]);

  const closeModal = () => {
    setShowResourceModal(false);
  };

  const handleSnakClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnak({ ...snak, open: false });
  };

  const confirmResource = () => {
    if (!resource) {
      setSnak({
        type: "error",
        message: "لطفا Resource را از لیست انتخاب کنید.",
        open: true,
      });
      return;
    }
    closeModal();
    updateNode(selectedNodeId, resource);
  };

  const updateNode = (nodeId, resource) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: resource.label,
            resourceId: resource.id,
            responses: resource.responses
              ? [...resource.responses]
              : node.responses,
          };
        }
        return node;
      })
    );
    const updatedEdges = edges.filter((edge) => edge.source !== nodeId);
    console.log(updatedEdges);
    setEdges([...updatedEdges]);
    updateNodeInternals(nodeId);
  };

  const updateFlowHandler = async () => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    const [isValid, errors] = IsFlowValid(nodes, edges);
    if(isValid){
      const flowStates = ConvertFlowToNeo4j(nodes, edges);
      try {
        await updateFlow(
            `${BASE_URL}/flow/update/states`,
            {
              flowId: flow.flowId,
              flowStates,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );
        setSnak({
          type: "success",
          message: "فلوچارت با موفقیت بروز شد.",
          open: true,
        });
      } catch (error) {
        setSnak({
          type: "error",
          message: "بروز رسانی با خطا مواجه شد. لطفا دوباره تلاش کنید.",
          open: true,
        });
      }
    }else{
      errors.forEach(item=>{
        toast.error(item)
      })
    }
    setLoading(false);

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
          { type: "add", label: "افزودن", onClick: confirmResource },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
        description={
          " برای افزودن Resource ابتدا آن را جستجو و سپس از لیست نمایش داده شده انتخاب نمایید."
        }
      >
        <div className="mb-3">
          <Autocomplete
            options={availableResources}
            onChange={(event, newValue) => {
              setResource(newValue);
            }}
            noOptionsText="داده‌ای یافت نشد."
            renderInput={(params) => {
              return (
                <TextField
                  fullWidth
                  variant="standard"
                  {...params}
                  label="Resources"
                />
              );
            }}
          />
          {(nodeType === "Announcement" || nodeType === "Question") ?
            <TextField
            fullWidth
            variant="standard"
            label="Resources"
            />
             : <></>}
        </div>
      </Modal>
      <div className="mt-3">
        <div className="mb-3 text-end">
          <Button
            variant="contained"
            color="success"
            disabled={loading}
            startIcon={<SyncIcon className={loading ? styles.update : ""} />}
            onClick={updateFlowHandler}
          >
            به روز رسانی فلوچارت
          </Button>
        </div>
        <div style={{ height: "100vh", direction: "ltr" }}>
          <ReactFlow
            fitView
            nodeTypes={nodeTypes}
            ref={reactFlowWrapper}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            defaultEdgeOptions={defaultEdgeOptions}
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onInit={setReactFlowInstance}
            connectionLineType={ConnectionLineType.SmoothStep}
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
      </div>
    </>
  );
};

export default Chart;
