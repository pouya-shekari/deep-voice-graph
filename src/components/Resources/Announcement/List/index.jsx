import React, { useState } from "react";
import useSWR from "swr";
import { Alert, Chip, Stack } from "@mui/material";

import Table from "@cmp/UI/Table";

import localStorageHelper from "@utils/localStrogeHelper";
import Loading from "@cmp/UI/Loading";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Button } from "@mui/material";
import useSnak from "@hooks/useSnak";
import getAnnouncements from "@services/annoucements/getAnnouncements";
import useModal from "@hooks/useModal";
import Add from "@cmp/Resources/Announcement/Add";
import Delete from "@cmp/Resources/Announcement/Delete";
import Edit from "@cmp/Resources/Announcement/Edit";

import deleteAnnouncement from "@services/annoucements/deleteAnnouncement";
import updateAnnouncement from "@services/annoucements/updateAnnouncement";
import Search from "@cmp/Resources/Search";

const tableHeaders = [
  { title: "شناسه اعلان", field: "id", style: {} },
  {
    title: "عنوان اعلان",
    field: "title",
    style: {
      maxWidth: 350,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  { title: "وضعیت اعلان", field: "isEnable", style: {} },
  { title: "فلوچارت‌های استفاده کننده", field: "flowNames", style: {} },
];

const List = () => {
  const [selectedId, setSelectedId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { showSnak } = useSnak();
  const modal = useModal();

  const {
    data: announcements,
    error: announcementsError,
    mutate: mutateAnnouncements,
  } = useSWR(
    ["announcement/list", localStorageHelper.load("token"), "Announcement"],
    getAnnouncements
  );

  const showDeleteModal = (id) => {
    setSelectedId(id);
    modal.show({ isDeleteAnnouncementModalOpen: true });
  };

  const showEditModal = (id) => {
    setSelectedId(id);
    modal.show({ isEditAnnouncementModalOpen: true });
  };

  const deleteHandler = async () => {
    showSnak({ type: "warning", message: "در حال حذف اعلان..." });
    try {
      await deleteAnnouncement(
        "announcement/delete",
        localStorageHelper.load("token"),
        selectedId
      );
      mutateAnnouncements(
        announcements.filter((ann) => ann.announcementId !== selectedId),
        { revalidate: false }
      );
      showSnak({ type: "success", message: "اعلان با موفقیت حذف شد." });
    } catch (error) {
      showSnak({ type: "error", message: "حذف اعلان با خطا مواجه شد." });
    }
    modal.close();
  };

  const editHandler = async (newTitle) => {
    showSnak({ type: "warning", message: "در حال ویرایش اعلان..." });
    try {
      await updateAnnouncement(
        "announcement/update",
        localStorageHelper.load("token"),
        {
          id: selectedId,
          newTitle,
        }
      );
      const newData = announcements.map((item) => {
        if (item.announcementId === selectedId) {
          return { ...item, text: newTitle };
        }
        return item;
      });
      mutateAnnouncements([...newData], { revalidate: false });
      showSnak({ type: "success", message: "اعلان با موفقیت بروز شد." });
    } catch (error) {
      showSnak({ type: "error", message: "بروزرسانی اعلان با خطا مواجه شد." });
    }
    modal.close();
  };

  const showAddModal = () => {
    modal.show({ isAddAnnouncementModalOpen: true });
  };
  const updateList = (data) => {
    mutateAnnouncements([...announcements, data], { revalidate: false });
  };

  const searchHandler = (text) => {
    setSearchQuery(text);
  };

  if (announcementsError)
    return (
      <Alert
        aria-label={"announcement-error"}
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!announcements) return <Loading />;

  const tableData = announcements.map((item) => {
    return {
      ...item,
      id: item.announcementId,
      title: item.text,
      flowNames: (
        <Stack direction={"row"} spacing={1} justifyContent="center">
          {item.flowNames?.map((name) => (
            <Chip
              label={name}
              key={name}
              color="success"
              size="small"
              className="english"
            />
          ))}
        </Stack>
      ),
      isEnable: (
        <Alert
          severity={item.isEnable ? "success" : "error"}
          sx={{ justifyContent: "center" }}
        >
          {item.isEnable ? "فعال" : "غیرفعال"}
        </Alert>
      ),
    };
  });

  const handleContextMenu = () => {};

  return (
    <>
      <Add updateListHandler={updateList} />
      <Delete onDelete={deleteHandler} />
      <Edit
        title={
          announcements.find((item) => item.announcementId === selectedId)?.text
        }
        onEdit={editHandler}
      />
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
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <Search onSearch={searchHandler} />
        </div>
      </div>
      <Table
        type={"simple"}
        data={[...tableData].filter((ann) => ann.title.includes(searchQuery))}
        label={"announcements table"}
        hasAction={true}
        tableHeaders={tableHeaders}
        onContextMenu={handleContextMenu}
        actions={[
          {
            type: "primary",
            icon: <EditIcon />,
            label: "ویرایش اعلان",
            onClickHandler: showEditModal,
          },
          {
            type: "error",
            icon: <DeleteIcon />,
            label: "حذف اعلان",
            onClickHandler: showDeleteModal,
          },
        ]}
      />
    </>
  );
};

export default List;
