import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const Delete = ({ onDelete }) => {
  const modal = useModal();
  const closeModalHandler = () => {
    modal.close();
  };

  return (
    <Modal
      open={modal.modalStates.isDeleteActionModalOpen}
      label="delete-action-modal"
      title={"آیا از حذف این اکشن اطمینان دارید؟"}
      onClose={closeModalHandler}
      description={
        "در صورت انتخاب گزینه حذف، اگر این اکشن در هیچ فلوچارتی مورد استفاده قرار نگرفته باشد، از لیست اکشن‌های شما حذف خواهد شد."
      }
      actions={[
        {
          type: "error",
          label: "حذف اکشن",
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
