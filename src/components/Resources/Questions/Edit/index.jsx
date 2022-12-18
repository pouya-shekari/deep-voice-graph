import React, { useRef, useState } from "react";

import { TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Title from "@utils/QuestionValidator/Title";

import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";

const Edit = ({ onEdit, title }) => {
  const [error, setError] = useState("");
  const titleRef = useRef();
  const modal = useModal();
  const closeModalHandler = () => {
    modal.close();
    setError("");
  };

  const editHander = () => {
    setError("");
    if (!Title(titleRef.current.value)) {
      setError("عنوان سوال نمی‌تواند خالی باشد.");
      return;
    }
    onEdit(titleRef.current.value);
  };

  return (
    <Modal
      open={modal.modalStates.isEditQuestionModalOpen}
      onClose={closeModalHandler}
      label="edit-question-modal"
      title={"ویرایش سوال "}
      description={"برای ویرایش سوال، وارد کردن عنوان سوال الزامی می‌باشد."}
      actions={[
        {
          type: "primary",
          label: "ویرایش سوال ",
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
          id="question-title"
          label="عنوان سوال"
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
