import React, { useState, useRef } from "react";
import useSWR from "swr";
import { Alert, Button, Box, CircularProgress, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  addChecker,
  deleteChecker,
  getCheckers,
  editChecker,
} from "../../api/checker.api";
import { BASE_URL } from "../../config/variables.config";
import { SimpleTable } from "../UI/Table/Tabel";
import Modal from "../UI/Modal/Modal";
import Snak from "../Snak/Snak";
const getAllCheckers = async (url) => {
  const { data } = await getCheckers(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      applicationId: 14,
    },
  });
  return data;
};

const tableHeaders = [
  { colNumber: 0, title: "شناسه چکر", field: "id" },
  { colNumber: 1, title: "عنوان چکر", field: "title" },
  { colNumber: 2, title: "URL", field: "url" },
  { colNumber: 3, title: "وضعیت چکر", field: "isEnable" },
];

const List = () => {
  const titleRef = useRef(null);
  const URLRef = useRef(null);

  const titleEditRef = useRef(null);
  const URLEditRef = useRef(null);

  const [titleError, setTitleError] = useState({
    isError: false,
    errorText: "",
  });

  const [URLError, setURLError] = useState({
    isError: false,
    errorText: "",
  });

  const [snak, setSnak] = useState({
    message: "",
    type: "",
    open: false,
  });

  const [checkerDefaultValues, setCheckerDefaultValues] = useState({
    title: "",
    url: "",
  });

  const [deleteId, setDeleteId] = useState(0);
  const { data, error, mutate } = useSWR(
    `${BASE_URL}/checker/list`,
    getAllCheckers
  );
  const [modalState, setModalState] = useState({
    deleteModal: false,
    addModal: false,
    editModal: false,
  });
  const showEditModal = (id, event) => {
    // TODO: must be raname.
    setDeleteId(id);
    const checkerItem = data.find((item) => item.checkerId === id);
    setCheckerDefaultValues({
      title: checkerItem.text,
      url: checkerItem.url,
    });
    setModalState((prevState) => {
      return { ...prevState, editModal: true };
    });
  };
  const showDeleteModal = (id, event) => {
    setModalState((prevState) => {
      return { ...prevState, deleteModal: true };
    });
    setDeleteId(id);
  };
  const closeModal = () => {
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
    setURLError({
      isError: false,
      errorText: "",
    });
    setTitleError({
      isError: false,
      errorText: "",
    });
    const titleValue = titleRef.current.value.trim();
    const URLValue = URLRef.current.value.trim();
    let isValid = true;
    if (titleValue === "") {
      isValid = false;
      setTitleError({
        isError: true,
        errorText: "لطفا عنوان چکر را وارد کنید.",
      });
    }
    if (URLValue === "") {
      isValid = false;
      setURLError({
        isError: true,
        errorText: "لطفا URL را وارد کنید.",
      });
    }
    if (!isValid) {
      return;
    }
    setSnak({
      open: true,
      type: "warning",
      message: "در حال افزودن چکر...",
    });
    try {
      const res = await addChecker(
        `${BASE_URL}/checker/create`,
        {
          applicationId: 14,
          text: titleValue,
          url: URLValue,
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
        message: "چکر با موفقیت افزوده شد.",
      });
      closeModal();
    } catch (error) {
      if (error.message === "409") {
        setSnak({
          open: true,
          type: "error",
          message: "نام چکر تکراری می‌باشد.",
        });
        return;
      }
      setSnak({
        open: true,
        type: "error",
        message: "افزودن چکر با خطا مواجه شد.",
      });
    }
  };

  const confirmDelete = async () => {
    closeModal();
    setSnak({
      open: true,
      type: "warning",
      message: "در حال حذف چکر...",
    });
    try {
      await deleteChecker(`${BASE_URL}/checker/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          checkerId: deleteId,
        },
      });
      setSnak({
        open: true,
        type: "success",
        message: "چکر با موفقیت حذف شد.",
      });
      mutate(
        data.filter((checker) => checker.checkerId !== deleteId),
        { revalidate: false }
      );
    } catch (error) {
      setSnak({
        open: true,
        type: "error",
        message: "حذف چکر با خطا مواجه شد.",
      });
    }
  };
  const confirmEdit = async () => {
    setURLError({
      isError: false,
      errorText: "",
    });
    setTitleError({
      isError: false,
      errorText: "",
    });
    const titleValue = titleEditRef.current.value.trim();
    const URLValue = URLEditRef.current.value.trim();
    let isValid = true;
    if (titleValue === "") {
      isValid = false;
      setTitleError({
        isError: true,
        errorText: "لطفا عنوان چکر را وارد کنید.",
      });
    }
    if (URLValue === "") {
      isValid = false;
      setURLError({
        isError: true,
        errorText: "لطفا URL را وارد کنید.",
      });
    }
    if (!isValid) {
      return;
    }
    setSnak({
      open: true,
      type: "warning",
      message: "در حال ویرایش چکر...",
    });
    try {
      const res = await editChecker(
        `${BASE_URL}/checker/update`,
        {
          checkerId: deleteId,
          text: titleValue,
          url: URLValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newData = data.map((item) => {
        if (item.checkerId === deleteId) {
          return { ...item, text: titleValue, url: URLValue };
        }
        return item;
      });
      mutate([...newData], { revalidate: false });
      setSnak({
        open: true,
        type: "success",
        message: "چکر با موفقیت ویرایش شد.",
      });
      closeModal();
    } catch (error) {
      if (error.message === "409") {
        setSnak({
          open: true,
          type: "error",
          message: "نام چکر تکراری می‌باشد.",
        });
        return;
      }
      setSnak({
        open: true,
        type: "error",
        message: "ویرایش چکر با خطا مواجه شد.",
      });
    }
  };
  const showAddModal = () => {
    setModalState((prevState) => {
      return { ...prevState, addModal: true };
    });
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
        sx={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}
      >
        <CircularProgress />
      </Box>
    );
  const tableData = data.map(({ checkerId, isEnable, text, url }) => {
    return {
      id: checkerId,
      title: text,
      isEnable: (
        <Alert
          severity={isEnable ? "success" : "error"}
          sx={{ justifyContent: "center" }}
        >
          {isEnable ? "فعال" : "غیرفعال"}
        </Alert>
      ),
      url,
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
        open={modalState.deleteModal}
        onClose={closeModal}
        title={"آیا از حذف این چکر اطمینان دارید؟"}
        actions={[
          { type: "delete", label: "تایید", onClick: confirmDelete },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
      >
        در صورت انتخاب گزینه حذف، اگر این چکر در هیچ فلوچارتی مورد استفاده قرار
        نگرفته باشد، از لیست چکرهای شما حذف خواهد شد.
      </Modal>
      {/* Add Modal */}
      <Modal
        open={modalState.addModal}
        onClose={closeModal}
        title={"افزودن چکر جدید"}
        description={
          "برای افزودن چکر جدید، وارد کردن عنوان چکر و URL  چکر الزامی می‌باشد."
        }
        actions={[
          { type: "add", label: "افزودن", onClick: confirmAdd },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
      >
        <div className="mb-3">
          <TextField
            id="checker-title"
            label="عنوان چکر"
            type="text"
            fullWidth
            variant="standard"
            error={titleError.isError}
            helperText={titleError.errorText}
            inputRef={titleRef}
            autoComplete={"off"}
          />
        </div>
        <div className="mb-3">
          <TextField
            id="checker-url"
            label="URL چکر"
            type="text"
            fullWidth
            variant="standard"
            error={URLError.isError}
            helperText={URLError.errorText}
            inputRef={URLRef}
            autoComplete={"off"}
          />
        </div>
      </Modal>
      <Modal
        open={modalState.editModal}
        onClose={closeModal}
        title={"ویرایش چکر"}
        description={
          "برای ویرایش چکر، وارد کردن عنوان چکر و URL  چکر الزامی می‌باشد."
        }
        actions={[
          { type: "edit", label: "ویرایش", onClick: confirmEdit },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
      >
        <div className="mb-3">
          <TextField
            id="checker-title-edit"
            label="عنوان چکر"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            defaultValue={checkerDefaultValues.title}
            inputRef={titleEditRef}
            error={titleError.isError}
            helperText={titleError.errorText}
          />
        </div>
        <div className="mb-3">
          <TextField
            id="checker-url-edit"
            label="URL چکر"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            defaultValue={checkerDefaultValues.url}
            inputRef={URLEditRef}
            error={URLError.isError}
            helperText={URLError.errorText}
          />
        </div>
      </Modal>
      <div aria-label="add new checker" className="mb-3">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={showAddModal}
        >
          افزودن چکر جدید
        </Button>
      </div>
      <SimpleTable
        label={"Checker Table"}
        data={tableData}
        hasAction={true}
        actions={[
          { type: "edit", label: "ویرایش چکر", onClick: showEditModal },
          { type: "delete", label: "حذف چکر", onClick: showDeleteModal },
        ]}
        tableHeaders={tableHeaders}
        options={{}}
      />
    </>
  );
};

export default List;
