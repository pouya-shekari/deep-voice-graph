import React, { useState } from "react";
import useSWR from "swr";
import { Alert } from "@mui/material";

import Table from "@cmp/UI/Table";

import localStorageHelper from "@utils/localStrogeHelper";
import Loading from "@cmp/UI/Loading";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Button } from "@mui/material";
import useSnak from "@hooks/useSnak";
import useModal from "@hooks/useModal";

import Delete from "@cmp/Resources/Action/Delete";
import Add from "@cmp/Resources/Action/Add";
import Edit from "@cmp/Resources/Action/Edit";

import getActions from "@services/actions/getActions";
import deleteAction from "@services/actions/deleteAction";
import updateAction from "@services/actions/updateChecker";

const tableHeaders = [
  { title: "شناسه اکشن", field: "id", style: {} },
  {
    title: "عنوان اکشن",
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
  { title: "وضعیت اکشن", field: "isEnable", style: {} },
];

const List = () => {
  const [selectedId, setSelectedId] = useState(0);

  const { showSnak } = useSnak();
  const modal = useModal();

  const {
    data: actions,
    error: actionsError,
    mutate: mutateActions,
  } = useSWR(
    ["action/list", localStorageHelper.load("token"), "Actions"],
    getActions
  );

  const showDeleteModal = (id) => {
    setSelectedId(id);
    modal.show({ isDeleteActionModalOpen: true });
  };

  const deleteHandler = async () => {
    showSnak({ type: "warning", message: "در حال حذف اکشن..." });
    try {
      await deleteAction(
        "action/delete",
        localStorageHelper.load("token"),
        selectedId
      );
      mutateActions(
        actions.filter((ann) => ann.actionId !== selectedId),
        { revalidate: false }
      );
      showSnak({ type: "success", message: "اکشن با موفقیت حذف شد." });
    } catch (error) {
      showSnak({ type: "error", message: "حذف اکشن با خطا مواجه شد." });
    }
    modal.close();
  };

  const updateList = (data) => {
    mutateActions([...actions, data], { revalidate: false });
  };

  const showEditModal = (id) => {
    setSelectedId(id);
    modal.show({ isEditActionModalOpen: true });
  };
  const showAddModal = () => {
    modal.show({ isAddActionModalOpen: true });
  };

  const editHandler = async (newTitle, newUrl) => {
    showSnak({ type: "warning", message: "در حال ویرایش اکشن..." });
    try {
      await updateAction("action/update", localStorageHelper.load("token"), {
        id: selectedId,
        newTitle,
        newUrl,
      });
      const newData = actions.map((item) => {
        if (item.actionId === selectedId) {
          return { ...item, text: newTitle, url: newUrl };
        }
        return item;
      });
      mutateActions([...newData], { revalidate: false });
      showSnak({ type: "success", message: "اکشن با موفقیت بروز شد." });
    } catch (error) {
      showSnak({ type: "error", message: "بروزرسانی اکشن با خطا مواجه شد." });
    }
    modal.close();
  };

  if (actionsError)
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!actions) return <Loading />;

  const tableData = actions.map((item) => {
    return {
      ...item,
      id: item.actionId,
      title: item.text,
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

  return (
    <>
      <Add updateListHandler={updateList} />
      <Edit
        title={actions.find((item) => item.actionId === selectedId)?.text}
        url={actions.find((item) => item.actionId === selectedId)?.url}
        onEdit={editHandler}
      />
      <Delete onDelete={deleteHandler} />
      <div aria-label="add new announcement" className="mb-3">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={showAddModal}
        >
          افزودن اکشن جدید
        </Button>
      </div>
      <Table
        type={"simple"}
        data={tableData}
        label={"action table"}
        hasAction={true}
        tableHeaders={tableHeaders}
        actions={[
          {
            type: "primary",
            icon: <EditIcon />,
            label: "ویرایش اکشن",
            onClickHandler: showEditModal,
          },
          {
            type: "error",
            icon: <DeleteIcon />,
            label: "حذف اکشن",
            onClickHandler: showDeleteModal,
          },
        ]}
      />
    </>
  );
};

export default List;
