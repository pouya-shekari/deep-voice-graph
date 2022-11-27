import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React, { useRef, useState } from "react";

import { TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import actionValidator from "@utils/actionValidator";

const Edit = ({ onEdit, title, url }) => {
  const [titleError, setTitleError] = useState("");
  const titleRef = useRef();

  const [UrlError, setUrlError] = useState("");
  const UrlRef = useRef();

  const modal = useModal();
  const closeModalHandler = () => {
    setTitleError("");
    setUrlError("");
    modal.close();
  };

  const editHander = () => {
    setTitleError("");
    setUrlError("");
    let valid = true;
    if (!actionValidator(titleRef.current.value)) {
      setTitleError("عنوان اکشن نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!actionValidator(UrlRef.current.value)) {
      setUrlError("URL اکشن نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!valid) return;
    onEdit(titleRef.current.value, UrlRef.current.value);
  };

  return (
    <Modal
      open={modal.modalStates.isEditActionModalOpen}
      label="edit-announcement-modal"
      title={"ویرایش چکر "}
      onClose={closeModalHandler}
      description={
        "برای افزودن اکشن جدید، وارد کردن عنوان اکشن و URL الزامی می‌باشد."
      }
      actions={[
        {
          type: "primary",
          label: "ویرایش اکشن ",
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
          id="action-title"
          label="عنوان اکشن"
          type="text"
          fullWidth
          variant="standard"
          autoComplete={"off"}
          defaultValue={title}
          inputRef={titleRef}
          error={titleError !== ""}
          helperText={titleError}
        />
      </div>
      <div className="mb-3">
        <TextField
          id="action-url"
          label="URL اکشن"
          type="text"
          fullWidth
          variant="standard"
          autoComplete={"off"}
          defaultValue={url}
          inputRef={UrlRef}
          error={UrlError !== ""}
          helperText={UrlError}
        />
      </div>
    </Modal>
  );
};

export default Edit;
