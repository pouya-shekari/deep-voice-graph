import React, { useRef, useCallback, useState, useEffect } from "react";
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

const defaultEdgeOptions = GetDefaultEdgeOptions();
const nodeTypes = getNodeTypes();
const Chart = ({ flow }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [availableResources, setAvailableResources] = useState([]);
  const [updateResourcesFlag, setUpdateResourcesFlag] = useState(false);
  const [nodeType, setNodeType] = useState("");
  const [resource, setResource] = React.useState(null);
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
    setSelectedNodeId(node.id);
    if (node.type === "Start" || node.type === "End") {
      setSnak({
        type: "error",
        message: "افزودن Resource به نقاط شروع و پایان امکان‌پذیر نمی‌باشد.",
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
            applicationId: 14,
            isQuestion: false,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({ label: item.text, id: item.announcementId });
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
            applicationId: 14,
            isQuestion: true,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({ label: item.text, id: item.announcementId });
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
            applicationId: 14,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({ label: item.text, id: item.actionId });
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
            applicationId: 14,
          },
        })
          .then((res) => {
            let options = [];
            res.data.forEach((item) => {
              options.push({ label: item.text, id: item.checkerId });
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
    console.log(selectedNodeId);
    console.log(resource)
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
        </div>
      </Modal>
      <div className="mt-3">
        <div className="mb-3 text-end">
          <Button variant="contained" color="success" startIcon={<SyncIcon />}>
            به روز رسانی فلوچارت
          </Button>
        </div>
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
              <Controls showFitView={false} />
              <Background />
              <MiniMap />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

export default React.memo(Chart);
