import React, { useState } from "react";
import useSWR from "swr";

import { Alert, Chip, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useSnak from "@hooks/useSnak";
import useModal from "@hooks/useModal";

import Table from "@cmp/UI/Table";
import Loading from "@cmp/UI/Loading";
import Delete from "@cmp/Resources/Questions/Delete";
import Edit from "@cmp/Resources/Questions/Edit";
import Add from "@cmp/Resources/Questions/Add";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

import getQuestions from "@services/questions/getQuestions";
import deleteQuestion from "@services/questions/deleteQuestion";
import updateQuestion from "@services/questions/updateQuestion";

import localStorageHelper from "@utils/localStrogeHelper";
import getUsedQuestions from "@services/questions/getUsedQuestions";

import exportFromJSON from "export-from-json";

const tableHeaders = [
  { title: "شناسه سوال", field: "id", style: {} },
  {
    title: "عنوان سوال",
    field: "title",
    style: {
      width: "30%",
      maxWidth: 100,
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderStyle: "border-box",
    },
  },
  { title: "وضعیت سوال", field: "isEnable", style: {} },
  { title: "فلوچارت‌های استفاده کننده", field: "flowNames", style: {} },
];

const List = () => {
  const [selectedId, setSelectedId] = useState(0);

  const { showSnak } = useSnak();
  const modal = useModal();

  const {
    data: questions,
    error: questionsError,
    mutate: mutateQuestions,
  } = useSWR(
    ["announcement/list", localStorageHelper.load("token"), "Question"],
    getQuestions
  );

  const showDeleteModal = (id) => {
    setSelectedId(id);
    modal.show({ isDeleteQuestionModalOpen: true });
  };

  const deleteHandler = async () => {
    showSnak({ type: "warning", message: "در حال حذف سوال..." });
    try {
      await deleteQuestion(
        "announcement/delete",
        localStorageHelper.load("token"),
        selectedId
      );
      mutateQuestions(
        questions.filter((ann) => ann.announcementId !== selectedId),
        { revalidate: false }
      );
      showSnak({ type: "success", message: "سوال با موفقیت حذف شد." });
    } catch (error) {
      showSnak({ type: "error", message: "حذف سوال با خطا مواجه شد." });
    }
    modal.close();
  };

  const showEditModal = (id) => {
    setSelectedId(id);
    modal.show({ isEditQuestionModalOpen: true });
  };

  const editHandler = async (newTitle) => {
    showSnak({ type: "warning", message: "در حال ویرایش اعلان..." });
    try {
      await updateQuestion(
        "announcement/update",
        localStorageHelper.load("token"),
        {
          id: selectedId,
          newTitle,
        }
      );
      const newData = questions.map((item) => {
        if (item.announcementId === selectedId) {
          return { ...item, text: newTitle };
        }
        return item;
      });
      mutateQuestions([...newData], { revalidate: false });
      showSnak({ type: "success", message: "سوال با موفقیت بروز شد." });
    } catch (error) {
      showSnak({ type: "error", message: "بروزرسانی سوال با خطا مواجه شد." });
    }
    modal.close();
  };

  const showAddModal = () => {
    modal.show({ isAddQuestionModalOpen: true });
  };

  const updateList = (data) => {
    mutateQuestions([...questions, data], { revalidate: false });
  };

  const downloadUsedQuestions = async () => {
    try {
      const res = await getUsedQuestions(
        "announcement/list/usedQuestions",
        localStorageHelper.load("token")
      );
      const fileName = "usedQuestions";
      const exportType = exportFromJSON.types.json;
      exportFromJSON({ data: res, fileName, exportType });
    } catch (error) {
      showSnak({ type: "error", message: "دریافت سوالات با خطا مواجه شد." });
    }
  };
  if (questionsError)
    return (
      <Alert
        aria-label="question-error"
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        دریافت اطلاعات با خطا مواجه شد! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!questions) return <Loading />;

  const tableData = questions.map((item) => {
    return {
      ...item,
      id: item.announcementId,
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
  return (
    <>
      <Add updateListHandler={updateList} />
      <Delete onDelete={deleteHandler} />
      <Edit
        title={
          questions.find((item) => item.announcementId === selectedId)?.text
        }
        onEdit={editHandler}
      />
      <div
        aria-label="add new question"
        className="mb-3 d-flex justify-content-between flex-wrap gap-3"
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={showAddModal}
        >
          افزودن سوال جدید
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={downloadUsedQuestions}
        >
          دانلود سوالات استفاده شده در فلوچارت‌ها
        </Button>
      </div>
      <Table
        type={"with-collapse"}
        label={"questions table"}
        tableHeaders={tableHeaders}
        data={tableData}
        hasAction={true}
        subTableItem={"responses"}
        actions={[
          {
            type: "primary",
            icon: <EditIcon />,
            label: "ویرایش سوال",
            onClickHandler: showEditModal,
          },
          {
            type: "error",
            icon: <DeleteIcon />,
            label: "حذف سوال",
            onClickHandler: showDeleteModal,
          },
        ]}
      />
    </>
  );
};

export default List;
