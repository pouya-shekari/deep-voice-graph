import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Alert, Button, Box, CircularProgress, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getAnnouncements,
  deleteAnnouncement,
} from "../../api/announcement.api";
import { BASE_URL } from "../../config/variables.config";
import { SimpleTable } from "../UI/Table/Tabel";
import { ErrorModal } from "../UI/Modal/Modal";
import Snak from "../Snak/Snak";
const getAllAnn = async (url) => {
  const { data } = await getAnnouncements(url, {
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
  { colNumber: 0, title: "شناسه اعلان", field: "id" },
  { colNumber: 1, title: "عنوان اعلان", field: "title" },
  { colNumber: 2, title: "مدت زمان انتظار (ms)", field: "waitTime" },
  { colNumber: 3, title: "وضعیت اعلان", field: "isEnable" },
];

const List = () => {
  const [snak, setSnak] = useState({
    message: "",
    type: "",
    open: false,
  });
  const [deleteId, setDeleteId] = useState(0);
  const { data, error, mutate } = useSWR(
    `${BASE_URL}/announcement/list`,
    getAllAnn
  );
  const [modalState, setModalState] = useState({
    deleteModal: false,
    addModal: false,
  });

  const showDeleteModal = (id, event) => {
    setModalState((prevState) => {
      return { ...prevState, deleteModal: true };
    });
    setDeleteId(id);
  };
  const closeModal = () => {
    setModalState((prevState) => {
      return { ...prevState, deleteModal: false, addModal: false };
    });
  };
  const confirmDelete = async () => {
    closeModal();
    setSnak({
      open: true,
      type: "warning",
      message: "در حال حذف اعلان...",
    });
    try {
      const res = await deleteAnnouncement(`${BASE_URL}/announcement/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          announcementId: deleteId,
        },
      });
      setSnak({
        open: true,
        type: "success",
        message: "اعلان با موفقیت حذف شد.",
      });
      mutate(data.filter((ann) => ann.announcementId === deleteId));
    } catch (error) {
      setSnak({
        open: true,
        type: "error",
        message: "حذف اعلان با خطا مواجه شد.",
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
      <ErrorModal
        open={modalState.deleteModal}
        onClose={closeModal}
        title={"آیا از حذف این اعلان اطمینان دارید؟"}
        description={
          "در صورت انتخاب گزینه حذف، اگر این اعلان در هیچ فلوچارتی مورد استفاده قرار نگرفته باشد، از لیست اعلان‌های شما حذف خواهد شد."
        }
        actions={[
          { type: "delete", label: "تایید", onClick: confirmDelete },
          { type: "cancel", label: "انصراف", onClick: closeModal },
        ]}
      />
      <div aria-label="add new announcement" className="mb-3">
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          افزودن اعلان جدید
        </Button>
      </div>
      <SimpleTable
        label={"Annoucement Table"}
        data={tableData}
        hasAction={true}
        actions={[
          // { type: "edit", label: "ویرایش اعلان" },
          { type: "delete", label: "حذف اعلان", onClick: showDeleteModal },
        ]}
        tableHeaders={tableHeaders}
        options={{}}
      />
    </>
  );
};

export default List;
