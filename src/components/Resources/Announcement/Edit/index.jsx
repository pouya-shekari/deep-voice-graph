import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React, { useRef, useState } from "react";

import { TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import announcementValidator from "@utils/announcementValidator";

const Edit = ({ onEdit, title }) => {
  const [error, setError] = useState("");
  const titleRef = useRef();
  const modal = useModal();
  const closeModalHandler = () => {
    setError("");
    modal.close();
  };

  const editHander = () => {
    setError("");
    if (!announcementValidator(titleRef.current.value)) {
      setError("عنوان اعلان نمی‌تواند خالی باشد.");
      return;
    }
    onEdit(titleRef.current.value);
  };

  return (
    <Modal
      open={modal.modalStates.isEditAnnouncementModalOpen}
      label="edit-announcement-modal"
      title={"ویرایش اعلان "}
      onClose={closeModalHandler}
      description={"برای ویرایش اعلان، وارد کردن عنوان اعلان الزامی می‌باشد."}
      actions={[
        {
          type: "primary",
          label: "ویرایش اعلان ",
          icon: <EditIcon />,
          onClickHandler: editHander,
        },
        {
          type: "cancel",
          label: "انصراف",
          icon: <CloseIcon />,
          onClickHandler: closeModalHandler,
        },
      ]}
    >
      <div className="mb-3">
        <TextField
          id="ann-title"
          label="عنوان اعلان"
          type="text"
          fullWidth
          variant="standard"
          autoComplete={"off"}
          defaultValue={title}
          inputRef={titleRef}
          error={error !== ""}
          helperText={error}
        />
      </div>
    </Modal>
  );
};

export default Edit;
