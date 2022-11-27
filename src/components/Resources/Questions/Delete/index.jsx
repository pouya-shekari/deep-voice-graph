import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";

const Delete = ({ onDelete }) => {
  const modal = useModal();
  const closeModalHandler = () => {
    modal.close();
  };

  return (
    <Modal
      open={modal.modalStates.isDeleteQuestionModalOpen}
      onClose={closeModalHandler}
      label="delete-question-modal"
      title={"آیا از حذف این سوال اطمینان دارید؟"}
      description={
        "در صورت انتخاب گزینه حذف، اگر این سوال در هیچ فلوچارتی مورد استفاده قرار نگرفته باشد، از لیست سوال‌های شما حذف خواهد شد."
      }
      actions={[
        {
          type: "error",
          label: "حذف سوال",
          icon: <DeleteIcon />,
          onClickHandler: onDelete,
        },
        {
          type: "cancel",
          label: "انصراف",
          icon: <CloseIcon />,
          onClickHandler: closeModalHandler,
        },
      ]}
    />
  );
};

export default Delete;
