// TODO: Code splite 380 lines

import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Alert, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Table from "@cmp/UI/Table";

import getFlows from "@services/flows/getFlows";
import lockFlow from "@services/flows/lockFlow";
import localStorageHelper from "@utils/localStrogeHelper";
import Loading from "@cmp/UI/Loading";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import useSnak from "@hooks/useSnak";
import Add from "@cmp/Flow/Add";
import useModal from "@hooks/useModal";
import Edit from "@cmp/Flow/Edit";
import updateFlow from "@services/flows/updateFlow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@cmp/UI/Modal";
import flowValidator from "@utils/flowValidator";
import createFlow from "@services/flows/createFlow";
import axios from "@lib/axios";
import { v4 as uuidv4 } from "uuid";
import updateFlowStates from "@services/flows/updateFlowStates";
import convertFlowFromNeo4j from "@utils/convertors/convertFlowFromNeo4j";
import convertFlowToNeo4j from "@utils/convertors/convertFlowToNeo4j";
import Search from "@cmp/Resources/Search";

const tableHeaders = [
  { title: "شناسه فلوچارت", field: "id", style: {} },
  { title: "نام انگلیسی", field: "nameEN", style: {} },
  { title: "نام فارسی", field: "nameFA", style: {} },
  {
    title: "توضیحات",
    field: "description",
    style: {
      width: "30%",
      maxWidth: 100,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  { title: "وضعیت فلوچارت", field: "isEnable", style: {} },
];

const List = () => {
  const navigate = useNavigate();
  const { showSnak } = useSnak();
  const modal = useModal();
  const [selectedId, setSelectedId] = useState(0);
  const [contextMenu, setContextMenu] = useState(null);
  const [duplicateId, setDuplicateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [faNameError, setFaNameError] = useState("");
  const [enNameError, setEnNameError] = useState("");
  const [descError, setDescError] = useState("");

  const faRef = useRef();
  const enRef = useRef();
  const descRef = useRef();

  const {
    data: flows,
    error: flowsError,
    mutate: mutateFlows,
  } = useSWR(["flow/list", localStorageHelper.load("token")], getFlows);

  const searchHandler = (text) => {
    setSearchQuery(text);
  };

  if (flowsError)
    return (
      <Alert
        variant="filled"
        severity="error"
        aria-label="flow-error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!flows) return <Loading />;

  const tableData = flows.map((item) => {
    return {
      ...item,
      id: item.flowId,
      isEnable: (
        <Alert
          severity={item.enable ? "success" : "error"}
          sx={{ justifyContent: "center" }}
        >
          {item.enable ? "فعال" : "غیرفعال"}
        </Alert>
      ),
    };
  });

  const enableDisableFlow = async (id) => {
    const flowToEdit = flows.find((item) => item.flowId === id);
    try {
      await lockFlow(
        `flow/enable/${flowToEdit.flowId}`,
        localStorageHelper.load("token"),
        !flowToEdit.enable
      );
      const newData = flows.map((item) => {
        if (item.flowId === id) {
          return { ...item, enable: !flowToEdit.enable };
        }
        return item;
      });
      mutateFlows([...newData], { revalidate: false });
      showSnak({
        type: "success",
        message: `فلوچارت مورد نظر با موفقیت ${
          flowToEdit.enable ? "غیرفعال" : "فعال"
        } شد.`,
      });
    } catch (error) {}
  };

  const updateList = (data) => {
    mutateFlows([...flows, data], { revalidate: false });
  };

  const showEditModal = (row) => {
    setSelectedId(row.flowId);
    modal.show({ isEditFlowModalOpen: true });
  };

  const editHandler = async (nameEN, nameFA, description) => {
    showSnak({ type: "warning", message: "در حال ویرایش فلوچارت..." });
    try {
      await updateFlow("flow/update", localStorageHelper.load("token"), {
        id: selectedId,
        nameEN,
        nameFA,
        description,
      });
      const newData = flows.map((item) => {
        if (item.flowId === selectedId) {
          return { ...item, nameEN, nameFA, description };
        }
        return item;
      });
      mutateFlows([...newData], { revalidate: false });
      showSnak({ type: "success", message: "فلوچارت با موفقیت بروز شد." });
    } catch (error) {
      showSnak({
        type: "error",
        message: "بروزرسانی فلوچارت با خطا مواجه شد.",
      });
    }
    modal.close();
  };

  const handleContextMenu = (id, event) => {
    event.preventDefault();
    setDuplicateId(id);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDuplicate = () => {
    modal.show({ isFlowDuplicateModalOpen: true });
    setContextMenu(null);
  };

  const closeModalHandler = () => {
    setFaNameError("");
    setEnNameError("");
    setDescError("");
    modal.close();
  };

  const onConfirm = async () => {
    setFaNameError("");
    setEnNameError("");
    setDescError("");
    let valid = true;
    if (!flowValidator(faRef.current.value)) {
      setFaNameError("عنوان فارسی فلوچارت نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!flowValidator(enRef.current.value)) {
      setEnNameError("عنوان انگلیسی فلوچارت نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!flowValidator(descRef.current.value)) {
      setDescError("توضیحات فلوچارت نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!valid) return;
    showSnak({ type: "warning", message: "در حال افزودن فلوچارت..." });

    try {
      const res = await createFlow(
        `flow/create`,
        localStorageHelper.load("token"),
        {
          en: enRef.current.value,
          fa: faRef.current.value,
          desc: descRef.current.value,
        }
      );
      const config = {
        headers: {
          Authorization: `Bearer ${localStorageHelper.load("token")}`,
        },
      };
      try {
        const { data } = await axios.getAll(`/flow/${duplicateId}`, config);
        let newFlowStates = JSON.parse(JSON.stringify(data.flowStates));
        data.flowStates.forEach((item) => {
          let temp = item.stateId;
          newFlowStates = JSON.parse(
            JSON.stringify(newFlowStates).replaceAll(temp, uuidv4())
          );
        });
        const [nodes, edges] = convertFlowFromNeo4j(newFlowStates);
        try {
          await updateFlowStates(
            `/flow/update/states`,
            localStorageHelper.load("token"),
            {
              flowId: res.flowId,
              flowStates: convertFlowToNeo4j(nodes, edges),
            }
          );
          updateList(res);
          showSnak({ type: "success", message: "فلوچارت با موفقیت کپی شد." });
          modal.close();
        } catch (error) {}
      } catch (e) {}
    } catch (error) {
      if (error.message === "409") {
        showSnak({
          type: "error",
          message: "نام فلوچارت تکراری می‌باشد.",
        });
        return;
      }
      showSnak({
        type: "error",
        message: "افزودن فلوچارت با خطا مواجه شد.",
      });
    }
  };

  return (
    <>
      <Add updateListHandler={updateList} />
      <Edit
        nameFA={flows.find((item) => item.flowId === selectedId)?.nameFA}
        nameEN={flows.find((item) => item.flowId === selectedId)?.nameEN}
        description={
          flows.find((item) => item.flowId === selectedId)?.description
        }
        onEdit={editHandler}
      />
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <Search onSearch={searchHandler} />
        </div>
      </div>
      <Table
        type={"simple"}
        data={[...tableData].filter(
          (flow) =>
            flow.nameEN.includes(searchQuery) ||
            flow.nameFA.includes(searchQuery)
        )}
        label={"flow table"}
        hasAction={true}
        tableHeaders={tableHeaders}
        onRowClick={showEditModal}
        onContextMenu={handleContextMenu}
        actions={[
          {
            type: "cancel",
            icon: <RemoveRedEyeIcon />,
            label: "مشاهده فلوچارت",
            onClickHandler: (id) => {
              navigate(`/flows/${id}`);
            },
          },
          {
            type: "enable/disable",
            icon: null,
            label: "",
            onClickHandler: enableDisableFlow,
          },
        ]}
      />
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleDuplicate}>کپی از فلوچارت</MenuItem>
      </Menu>
      <Modal
        open={modal.modalStates.isFlowDuplicateModalOpen}
        onClose={closeModalHandler}
        label="copy-flow-modal"
        title={"افزودن فلوچارت کپی"}
        description={
          "برای افزودن فلوچارت کپی، وارد کردن عنوان فارسی، عنوان انگلیسی و توضیحات الزامی می‌باشد."
        }
        actions={[
          {
            type: "success",
            label: "افزودن فلوچارت کپی",
            icon: <AddIcon />,
            onClickHandler: onConfirm,
          },
          {
            type: "cancel",
            label: "انصراف",
            icon: <CloseIcon />,
            onClickHandler: closeModalHandler,
          },
        ]}
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <TextField
              id="flow-fa-title"
              label="عنوان فارسی فلوچارت"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={faNameError !== ""}
              helperText={faNameError}
              inputRef={faRef}
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              id="flow-en-title"
              label="عنوان انگلیسی فلوچارت"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={enNameError !== ""}
              helperText={enNameError}
              inputRef={enRef}
            />
          </div>
          <div className="col-md-12 mb-3">
            <TextField
              id="flow-description"
              label="توضیحات"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={descError !== ""}
              helperText={descError}
              inputRef={descRef}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default List;
