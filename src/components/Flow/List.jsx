import React, { useState, useRef } from "react";
import useSWR from "swr";
import { Alert, Button, Box, CircularProgress, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {getAllFlows, addFlow, lockFlow, updateFlow} from "../../api/flows.api";
import { APPLICATIONID, BASE_URL } from "../../config/variables.config";
import { SimpleTable } from "../UI/Table/Tabel";
import Modal from "../UI/Modal/Modal";
import Snak from "../Snak/Snak";
import { useNavigate } from "react-router-dom";

const getFlows = async (url) => {
  const { data } = await getAllFlows(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      applicationId: APPLICATIONID,
    },
  });
  return data;
};

const tableHeaders = [
  { colNumber: 0, title: "شناسه فلوچارت", field: "id", style: {} },
  { colNumber: 1, title: "نام انگلیسی", field: "nameEN", style: {} },
  { colNumber: 2, title: "نام فارسی", field: "nameFA", style: {} },
  {
    colNumber: 3,
    title: "توضیحات",
    field: "description",
    style: {
      width: "20%",
      maxWidth: 100,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  { colNumber: 3, title: "وضعیت فلوچارت", field: "isEnable", style: {} },
];

const List = () => {
  const navigate = useNavigate();

  const nameEnRef = useRef(null);
  const editNameEnRef = useRef(null);
  const nameFaRef = useRef(null);
  const editNameFaRef = useRef(null)
  const descriptionRef = useRef(null);
  const editDescriptionRef = useRef(null);

  const { data, error, mutate } = useSWR(`${BASE_URL}/flow/list`, getFlows);
  const [modalState, setModalState] = useState({
    deleteModal: false,
    addModal: false,
    editModal: false,
  });
  const [nameEnError, setNameEnError] = useState({
    isError: false,
    errorText: "",
  });
  const [nameFaError, setNameFaError] = useState({
    isError: false,
    errorText: "",
  });
  const [descriptionError, setDescriptionError] = useState({
    isError: false,
    errorText: "",
  });

  const [rowForUpdate , setRowForUpdate] = useState(null)

  const [snak, setSnak] = useState({
    message: "",
    type: "",
    open: false,
  });
  const showAddModal = () => {
    setModalState((prevState) => {
      return { ...prevState, addModal: true };
    });
  };
  const closeModal = () => {
    setNameEnError({
      isError: false,
      errorText: "",
    });
    setNameFaError({
      isError: false,
      errorText: "",
    });
    setDescriptionError({
      isError: false,
      errorText: "",
    });
    setModalState((prevState) => {
      return {
        ...prevState,
        deleteModal: false,
        addModal: false,
        editModal: false,
      };
    });
  };

  const confirmAdd = async () => {
    setNameEnError({
      isError: false,
      errorText: "",
    });
    setNameFaError({
      isError: false,
      errorText: "",
    });
    setDescriptionError({
      isError: false,
      errorText: "",
    });
    const nameEn = nameEnRef.current.value.trim();
    const nameFa = nameFaRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    let isValid = true;
    if (nameEn === "") {
      isValid = false;
      setNameEnError({
        isError: true,
        errorText: "لطفا عنوان فلوچارت را وارد کنید.",
      });
    }
    if (nameFa === "") {
      isValid = false;
      setNameFaError({
        isError: true,
        errorText: "لطفا عنوان فلوچارت را وارد کنید.",
      });
    }
    if (description === "") {
      isValid = false;
      setDescriptionError({
        isError: true,
        errorText: "لطفا توضیحات فلوچارت را وارد کنید.",
      });
    }
    if (!isValid) return;
    setSnak({
      open: true,
      type: "cancel",
      message: "در حال افزودن فلوچارت...",
    });
    try {
      const res = await addFlow(
        `${BASE_URL}/flow/create`,
        {
          applicationId: APPLICATIONID,
          nameEN: nameEn,
          nameFA: nameFa,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      mutate([...data, res.data], { revalidate: false });
      setSnak({
        open: true,
        type: "success",
        message: "فلوچارت با موفقیت افزوده شد.",
      });
      closeModal();
    } catch (error) {
      if (error.message === "409") {
        setSnak({
          open: true,
          type: "error",
          message: "نام فلوچارت تکراری می‌باشد.",
        });
        return;
      }
      setSnak({
        open: true,
        type: "error",
        message: "افزودن فلوچارت با خطا مواجه شد.",
      });
    }
  };

  const confirmEdit = async () => {
    setNameEnError({
      isError: false,
      errorText: "",
    });
    setNameFaError({
      isError: false,
      errorText: "",
    });
    setDescriptionError({
      isError: false,
      errorText: "",
    });
    const nameEn = editNameEnRef.current.value.trim();
    const nameFa = editNameFaRef.current.value.trim();
    const description = editDescriptionRef.current.value.trim();
    let isValid = true;
    if (nameEn === "") {
      isValid = false;
      setNameEnError({
        isError: true,
        errorText: "لطفا عنوان فلوچارت را وارد کنید.",
      });
    }
    if (nameFa === "") {
      isValid = false;
      setNameFaError({
        isError: true,
        errorText: "لطفا عنوان فلوچارت را وارد کنید.",
      });
    }
    if (description === "") {
      isValid = false;
      setDescriptionError({
        isError: true,
        errorText: "لطفا توضیحات فلوچارت را وارد کنید.",
      });
    }
    if (!isValid) return;
    setSnak({
      open: true,
      type: "cancel",
      message: "در حال ویرایش فلوچارت...",
    });
    try {
      const res = await updateFlow(
          `${BASE_URL}/flow/update`,
          {
            nameEN: nameEn,
            nameFA: nameFa,
            description:description,
            flowId:rowForUpdate.flowId
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );
      const newData = data.map((item) => {
        if (item.flowId === rowForUpdate.flowId) {
          return { ...item, nameEN: nameEn , nameFA:nameFa ,description:description  };
        }
        return item;
      });
      mutate([...newData], { revalidate: false });
      setSnak({
        open: true,
        type: "success",
        message: "فلوچارت با موفقیت ویرایش شد.",
      });
      setRowForUpdate(null)
      closeModal();
    } catch (error) {
      if (error.message === "409") {
        setSnak({
          open: true,
          type: "error",
          message: "نام فلوچارت تکراری می‌باشد.",
        });
        return;
      }
      setSnak({
        open: true,
        type: "error",
        message: "ویرایش فلوچارت با خطا مواجه شد.",
      });
    }
  };


  const enableDisableFlow = async (id , event) => {
    event.stopPropagation()
    const flowToEdit = data.find((item) => item.flowId === id);
    try {
      const res = await lockFlow(
        `${BASE_URL}/flow/enable/${flowToEdit.flowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            enable: !flowToEdit.enable,
          },
        }
      );
      const newData = data.map((item) => {
        if (item.flowId === id) {
          return { ...item, enable: !flowToEdit.enable };
        }
        return item;
      });
      mutate([...newData], { revalidate: false });
      setSnak({
        open: true,
        type: "success",
        message: `فلوچارت با موفقیت ${
          flowToEdit.enable ? "غیرفعال" : "فعال"
        } شد.`,
      });
      closeModal();
    } catch (error) {
      setSnak({
        open: true,
        type: "error",
        message: "درخواست شما با خطا مواجه شد.",
      });
    }
  };
  const handleSnakClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnak({ ...snak, open: false });
  };

  if (error)
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!data)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        <CircularProgress />
      </Box>
    );
  const tableData = data.map((item) => {
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
      actions: ["delete", "edit"],
    };
  });

  const handleEdit = (row,event)=>{
    setModalState((prevState) => {
      return { ...prevState, editModal: true };
    });
    setRowForUpdate(row)
  }

  return (
    <>
      <Snak
        isOpen={snak.open}
        type={snak.type}
        message={snak.message}
        onClose={handleSnakClose}
      />
      <Modal
        open={modalState.addModal}
        onClose={closeModal}
        title={"تعریف فلوچارت جدید"}
        description={
          "برای تعریف فلوچارت جدید، وارد کردن نام فارسی و انگلیسی به همراه توضیحات فلوچارت الزامی می‌باشد."
        }
        actions={[
          { type: "add", label: "افزودن", onClick: confirmAdd },
          { type: "cancel", label: "انصراف", onClick: closeModal },
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
              inputRef={nameFaRef}
              error={nameFaError.isError}
              helperText={nameFaError.errorText}
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
              inputRef={nameEnRef}
              error={nameEnError.isError}
              helperText={nameEnError.errorText}
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
              inputRef={descriptionRef}
              error={descriptionError.isError}
              helperText={descriptionError.errorText}
            />
          </div>
        </div>
      </Modal>

      <Modal
          open={modalState.editModal}
          onClose={closeModal}
          title={"ویرایش فلوچارت"}
          description={
            "برای ویرایش فلوچارت، وارد کردن نام فارسی و انگلیسی به همراه توضیحات فلوچارت الزامی می‌باشد."
          }
          actions={[
            { type: "edit", label: "ویرایش", onClick: confirmEdit },
            { type: "cancel", label: "انصراف", onClick: closeModal },
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
                inputRef={editNameFaRef}
                error={nameFaError.isError}
                helperText={nameFaError.errorText}
                defaultValue={rowForUpdate !== null ? rowForUpdate.nameFA :  ""}
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
                inputRef={editNameEnRef}
                error={nameEnError.isError}
                helperText={nameEnError.errorText}
                defaultValue={rowForUpdate !== null ? rowForUpdate.nameEN : ""}
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
                inputRef={editDescriptionRef}
                error={descriptionError.isError}
                helperText={descriptionError.errorText}
                defaultValue={rowForUpdate !== null ? rowForUpdate.description : ""}
            />
          </div>
        </div>
      </Modal>
      <div aria-label="add new announcement" className="mb-3">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={showAddModal}
        >
          تعریف فلوچارت جدید
        </Button>
      </div>
      <SimpleTable
        label={"Flow Table"}
        data={tableData}
        handleEdit={handleEdit}
        hasAction={true}
        actions={[
          { type: "enable", label: "غیرفعال سازی", onClick: (event,id)=>enableDisableFlow(event,id) },
          {
            type: "draw",
            label: "مشاهده فلوچارت",
            onClick: (id , event) => {
              event.stopPropagation()
              navigate(`/flows/${id}`, { replace: true });
            },
          },
        ]}
        tableHeaders={tableHeaders}
        options={{}}
      />
    </>
  );
};

export default List;
