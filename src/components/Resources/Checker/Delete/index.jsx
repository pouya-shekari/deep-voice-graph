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
      open={modal.modalStates.isDeleteCheckerModalOpen}
      label="delete-checker-modal"
      title={"آیا از حذف این چکر اطمینان دارید؟"}
      onClose={closeModalHandler}
      description={
        "در صورت انتخاب گزینه حذف، اگر این چکر در هیچ فلوچارتی مورد استفاده قرار نگرفته باشد، از لیست چکرهای شما حذف خواهد شد."
      }
      actions={[
        {
          type: "error",
          label: "حذف چکر",
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
