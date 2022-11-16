import React, { useState, useRef } from "react";
import useSWR from "swr";
import { Alert, Button, Box, CircularProgress, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getAnnouncements,
  deleteAnnouncement,
  addAnnouncement,
  editAnnouncement,
} from "../../api/announcement.api";
import { APPLICATIONID, BASE_URL } from "../../config/variables.config";
import { SimpleTable } from "../UI/Table/Tabel";
import Modal from "../UI/Modal/Modal";
import Snak from "../Snak/Snak";
import faToEnDigits from "../../helpers/faToEnDigits";

const getAllAnn = async (url) => {
  const { data } = await getAnnouncements(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      applicationId: APPLICATIONID,
      isQuestion: false,
    },
  });
  return data;
};

const tableHeaders = [
  { colNumber: 0, title: "شناسه اعلان", field: "id", style: {} },
  {
    colNumber: 1,
    title: "عنوان اعلان",
    field: "title",
    style: {
      width: "15%",
      maxWidth: 100,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  { colNumber: 2, title: "مدت زمان انتظار (ms)", field: "waitTime", style: {} },
  { colNumber: 3, title: "وضعیت اعلان", field: "isEnable", style: {} },
];

const List = () => {
  const titleRef = useRef(null);
  const waitTimeRef = useRef(null);

  const titleEditRef = useRef(null);
  const waitTimeEditRef = useRef(null);

  const [titleError, setTitleError] = useState({
    isError: false,
    errorText: "",
  });

  const [waitTimeError, setWaitTimeError] = useState({
    isError: false,
    errorText: "",
  });

  const [annDefaultValues, setAnnDefaultValues] = useState({
    title: "",
    waitTime: "",
  });

  const [snak, setSnak] = useState({
    message: "",
    type: "",
    open: false,
  });
  const [selectedId, setSelectedId] = useState(0);
  const { data, error, mutate } = useSWR(
    `${BASE_URL}/announcement/list`,
    getAllAnn
  );
  const [modalState, setModalState] = useState({
    deleteModal: false,
    addModal: false,
    editModal: false,
  });

  const showDeleteModal = (id, event) => {
    setModalState((prevState) => {
      return { ...prevState, deleteModal: true };
    });
    setSelectedId(id);
  };

  const showEditModal = (id, event) => {
    // TODO: must be raname.
    setSelectedId(id);
    const annItem = data.find((item) => item.announcementId === id);
    setAnnDefaultValues({
      title: annItem.text,
      waitTime: annItem.waitTime,
    });
    setModalState((prevState) => {
      return { ...prevState, editModal: true };
    });
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
    setSelectedId(null);
    setTitleError({ errorText: "", isError: false });
    setWaitTimeError({ errorText: "", isError: false });
  };

  const confirmAdd = async () => {
    setWaitTimeError({
      isError: false,
      errorText: "",
    });
    setTitleError({
      isError: false,
      errorText: "",
    });
    const titleValue = titleRef.current.value.trim();
    const waitTimeValue = waitTimeRef.current.value.trim();
    let isValid = true;
    if (
      isNaN(faToEnDigits(waitTimeValue)) ||
      faToEnDigits(waitTimeValue) <= 0
    ) {
      isValid = false;
      setWaitTimeError({
        isError: true,
        errorText: "مدت زمان انتظار وارد شده معتبر نیست.",
      });
    }
    if (titleValue === "") {
      isValid = false;
      setTitleError({
        isError: true,
        errorText: "لطفا عنوان اعلان را وارد کنید.",
      });
    }
    if (waitTimeValue === "") {
      isValid = false;
      setWaitTimeError({
        isError: true,
        errorText: "لطفا مدت زمان انتظار را وارد کنید.",
      });
    }
    if (!isValid) {
      return;
    }
    setSnak({
      open: true,
      type: "cancel",
      message: "در حال افزودن اعلان...",
    });
    try {
      const res = await addAnnouncement(
        `${BASE_URL}/announcement/create`,
        {
          applicationId: APPLICATIONID,
          text: titleValue,
          waitTime: waitTimeValue,
          statusCode: 1,
          isQuestion: false,
          responses: [],
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
        message: "اعلان با موفقیت افزوده شد.",
      });
      closeModal();
    } catch (error) {
      if (error.message === "409") {
        setSnak({
          open: true,
          type: "error",
          message: "نام اعلان تکراری می‌باشد.",
        });
        return;
      }
      setSnak({
        open: true,
        type: "error",
        message: "افزودن اعلان با خطا مواجه شد.",
      });
    }
  };

  const confirmEdit = async () => {
    setWaitTimeError({
      isError: false,
      errorText: "",
    });
    setTitleError({
      isError: false,
      errorText: "",
    });
    const titleValue = titleEditRef.current.value.trim();
    const waitTimeValue = waitTimeEditRef.current.value.trim();
    let isValid = true;
    if (
      isNaN(faToEnDigits(waitTimeValue)) ||
      faToEnDigits(waitTimeValue) <= 0
    ) {
      isValid = false;
      setWaitTimeError({
        isError: true,
        errorText: "مدت زمان انتظار وارد شده معتبر نیست.",
      });
    }
    if (titleValue === "") {
      isValid = false;
      setTitleError({
        isError: true,
        errorText: "لطفا عنوان اعلان را وارد کنید.",
      });
    }
    if (waitTimeValue === "") {
      isValid = false;
      setWaitTimeError({
        isError: true,
        errorText: "لطفا مدت زمان انتظار را وارد کنید.",
      });
    }
    if (!isValid) {
      return;
    }
    setSnak({
      open: true,
      type: "cancel",
      message: "در حال ویرایش اعلان...",
    });
    try {
      await editAnnouncement(
        `${BASE_URL}/announcement/update`,
        {
          announcementId: selectedId,
          text: titleValue,
          waitTime: waitTimeValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newData = data.map((item) => {
        if (item.announcementId === selectedId) {
          return { ...item, text: titleValue, waitTime: waitTimeValue };
        }
        return item;
      });
      mutate([...newData], { revalidate: false });
      setSnak({
        open: true,
        type: "success",
        message: "اعلان با موفقیت ویرایش شد.",
      });
      closeModal();
    } catch (error) {
      if (error.message === "409") {
        setSnak({
          open: true,
          type: "error",
          message: "نام اعلان تکراری می‌باشد.",
        });
        return;
      }
      setSnak({
        open: true,
        type: "error",
        message: "ویرایش اعلان با خطا مواجه شد.",
      });
    }
  };

  const confirmDelete = async () => {
    closeModal();
    setSnak({
      open: true,
      type: "cancel",
      message: "در حال حذف اعلان...",
    });
    try {
      await deleteAnnouncement(`${BASE_URL}/announcement/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          announcementId: selectedId,
        },
      });
      setSnak({
        open: true,
        type: "success",
        message: "اعلان با موفقیت حذف شد.",
      });
      mutate(
        data.filter((ann) => ann.announcementId !== selectedId),
        { revalidate: false }
      );
    } catch (error) {
      setSnak({
        open: true,
        type: "error",
        message: "حذف اعلان با خطا مواجه شد.",
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
  const tableData = data.map(({ announcementId, isEnable, text, waitTime }) => {
    return {
      id: announcementId,
      title: text,
      isEnable: (
        <Alert
          severity={isEnable ? "success" : "error"}
          sx={{ justifyContent: "center" }}
        >
          {isEnable ? "فعال" : "غیرفعال"}
        </Alert>
      ),
      waitTime,
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
        title={"آیا از حذف این اعلان اطمینان دارید؟"}
        actions={[
          { type: "delete", label: "تایید", onClick: confirmDelete },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
      >
        در صورت انتخاب گزینه حذف، اگر این اعلان در هیچ فلوچارتی مورد استفاده
        قرار نگرفته باشد، از لیست اعلان‌های شما حذف خواهد شد.
      </Modal>
      {/* Add Modal */}
      <Modal
        open={modalState.addModal}
        onClose={closeModal}
        title={"افزودن اعلان جدید"}
        description={
          "برای افزودن اعلان جدید، وارد کردن عنوان اعلان و مدت زمان انتظار (ms) الزامی می‌باشد."
        }
        actions={[
          { type: "add", label: "افزودن", onClick: confirmAdd },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
      >
        <div className="mb-3">
          <TextField
            id="ann-title"
            label="عنوان اعلان"
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
            id="ann-wait-time"
            label="مدت زمان انتظار (ms)"
            type="text"
            fullWidth
            variant="standard"
            error={waitTimeError.isError}
            helperText={waitTimeError.errorText}
            inputRef={waitTimeRef}
            autoComplete={"off"}
          />
        </div>
      </Modal>
      <Modal
        open={modalState.editModal}
        onClose={closeModal}
        title={"ویرایش اعلان"}
        description={
          "برای ویرایش اعلان، وارد کردن عنوان اعلان و مدت زمان انتظار (ms) الزامی می‌باشد."
        }
        actions={[
          { type: "edit", label: "ویرایش", onClick: confirmEdit },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
      >
        <div className="mb-3">
          <TextField
            id="ann-title-edit"
            label="عنوان اعلان"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            defaultValue={annDefaultValues.title}
            inputRef={titleEditRef}
            error={titleError.isError}
            helperText={titleError.errorText}
          />
        </div>
        <div className="mb-3">
          <TextField
            id="ann-wait-time-edit"
            label="مدت زمان انتظار (ms)"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            defaultValue={annDefaultValues.waitTime}
            inputRef={waitTimeEditRef}
            error={waitTimeError.isError}
            helperText={waitTimeError.errorText}
          />
        </div>
      </Modal>
      <div aria-label="add new announcement" className="mb-3">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={showAddModal}
        >
          افزودن اعلان جدید
        </Button>
      </div>
      <SimpleTable
        label={"Annoucement Table"}
        data={tableData}
        hasAction={true}
        actions={[
          { type: "edit", label: "ویرایش اعلان", onClick: showEditModal },
          { type: "delete", label: "حذف اعلان", onClick: showDeleteModal },
        ]}
        tableHeaders={tableHeaders}
        options={{}}
      />
    </>
  );
};

export default List;
