import React, { useState, useRef } from "react";
import useSWR from "swr";
import { Alert, Button, Box, CircularProgress, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getAllFlows, addFlow, lockFlow } from "../../api/flows.api";
import { BASE_URL } from "../../config/variables.config";
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
      applicationId: 14,
      isQuestion: false,
    },
  });
  return data;
};

const tableHeaders = [
  { colNumber: 0, title: "شناسه فلوچارت", field: "id" },
  { colNumber: 1, title: "نام انگلیسی", field: "nameEN" },
  { colNumber: 2, title: "نام فارسی", field: "nameFA" },
  { colNumber: 3, title: "توضیحات", field: "description" },
  { colNumber: 3, title: "وضعیت فلوچارت", field: "isEnable" },
];

const List = () => {
  const navigate = useNavigate();

  const nameEnRef = useRef(null);
  const nameFaRef = useRef(null);
  const descriptionRef = useRef(null);

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
      type: "warning",
      message: "در حال افزودن فلوچارت...",
    });
    try {
      const res = await addFlow(
        `${BASE_URL}/flow/create`,
        {
          applicationId: 14,
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
  const enableDisableFlow = async (id) => {
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
        message: "ویرایش اعلان با خطا مواجه شد.",
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
        <div className="mb-3"></div>
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
        hasAction={true}
        actions={[
          { type: "enable", label: "غیرفعال سازی", onClick: enableDisableFlow },
          {
            type: "draw",
            label: "ویرایش فلوچارت",
            onClick: (id) => {
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
