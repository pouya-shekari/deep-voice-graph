import React, { useState } from "react";
import useSWR from "swr";
import { Alert, Button, Chip, Stack } from "@mui/material";

import Table from "@cmp/UI/Table";

import localStorageHelper from "@utils/localStrogeHelper";
import Loading from "@cmp/UI/Loading";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useSnak from "@hooks/useSnak";
import useModal from "@hooks/useModal";
import getCheckers from "@services/checkers/getCheckers";
import Delete from "@cmp/Resources/Checker/Delete";
import Add from "@cmp/Resources/Checker/Add";
import Edit from "@cmp/Resources/Checker/Edit";

import deleteChecker from "@services/checkers/deleteChecker";
import updateChecker from "@services/checkers/updateChecker";

const tableHeaders = [
  { title: "شناسه چکر", field: "id", style: {} },
  {
    title: "عنوان چکر",
    field: "title",
    style: {
      width: "15%",
      maxWidth: 100,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  {
    title: "URL",
    field: "url",
    style: {
      width: "15%",
      maxWidth: 100,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  { title: "وضعیت چکر", field: "isEnable", style: {} },
  { title: "فلوچارت‌های استفاده کننده", field: "flowNames", style: {} },
];

const List = () => {
  const [selectedId, setSelectedId] = useState(0);

  const { showSnak } = useSnak();
  const modal = useModal();

  const {
    data: checkers,
    error: checkersError,
    mutate: mutateCheckers,
  } = useSWR(
    ["checker/list", localStorageHelper.load("token"), "Announcement"],
    getCheckers
  );

  const showDeleteModal = (id) => {
    setSelectedId(id);
    modal.show({ isDeleteCheckerModalOpen: true });
  };

  const deleteHandler = async () => {
    showSnak({ type: "warning", message: "در حال حذف چکر..." });
    try {
      await deleteChecker(
        "checker/delete",
        localStorageHelper.load("token"),
        selectedId
      );
      mutateCheckers(
        checkers.filter((ann) => ann.checkerId !== selectedId),
        { revalidate: false }
      );
      showSnak({ type: "success", message: "چکر با موفقیت حذف شد." });
    } catch (error) {
      showSnak({ type: "error", message: "حذف چکر با خطا مواجه شد." });
    }
    modal.close();
  };

  const updateList = (data) => {
    mutateCheckers([...checkers, data], { revalidate: false });
  };

  const showEditModal = (id) => {
    setSelectedId(id);
    modal.show({ isEditCheckerModalOpen: true });
  };

  const showAddModal = () => {
    modal.show({ isAddCheckerModalOpen: true });
  };

  const editHandler = async (newTitle, newUrl) => {
    showSnak({ type: "warning", message: "در حال ویرایش چکر..." });
    try {
      await updateChecker("checker/update", localStorageHelper.load("token"), {
        id: selectedId,
        newTitle,
        newUrl,
      });
      const newData = checkers.map((item) => {
        if (item.checkerId === selectedId) {
          return { ...item, text: newTitle, url: newUrl };
        }
        return item;
      });
      mutateCheckers([...newData], { revalidate: false });
      showSnak({ type: "success", message: "چکر با موفقیت بروز شد." });
    } catch (error) {
      showSnak({ type: "error", message: "بروزرسانی چکر با خطا مواجه شد." });
    }
    modal.close();
  };

  if (checkersError)
    return (
      <Alert
        aria-label="checker-error"
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!checkers) return <Loading />;

  const tableData = checkers.map((item) => {
    return {
      ...item,
      id: item.checkerId,
      title: item.text,
      flowNames: (
        <Stack direction={"row"} spacing={1} justifyContent="center">
          {item.flowNames.map((name) => (
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

  const handleContextMenu = ()=>{}

  return (
    <>
      <Add updateListHandler={updateList} />

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
      <Edit
        title={checkers.find((item) => item.checkerId === selectedId)?.text}
        url={checkers.find((item) => item.checkerId === selectedId)?.url}
        onEdit={editHandler}
      />
      <Delete onDelete={deleteHandler} />
      <Table
        type={"simple"}
        data={tableData}
        label={"checker table"}
        hasAction={true}
        tableHeaders={tableHeaders}
        onContextMenu={handleContextMenu}
        actions={[
          {
            type: "primary",
            icon: <EditIcon />,
            label: "ویرایش چکر",
            onClickHandler: showEditModal,
          },
          {
            type: "error",
            icon: <DeleteIcon />,
            label: "حذف چکر",
            onClickHandler: showDeleteModal,
          },
        ]}
      />
    </>
  );
};

export default List;
