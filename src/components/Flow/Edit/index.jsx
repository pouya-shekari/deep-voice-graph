import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { TextField } from "@mui/material";
import useSnak from "@hooks/useSnak";
import flowValidator from "@utils/flowValidator";

const Edit = ({ nameFA, nameEN, description, onEdit }) => {
  const [faNameError, setFaNameError] = useState("");
  const [enNameError, setEnNameError] = useState("");
  const [descError, setDescError] = useState("");

  const faRef = useRef();
  const enRef = useRef();
  const descRef = useRef();

  const modal = useModal();
  const closeModalHandler = () => {
    setFaNameError("");
    setEnNameError("");
    setDescError("");
    modal.close();
  };

  const onConfirm = async () => {
    setFaNameError("");
    setEnNameError("");
    setDescError("");
    let valid = true;
    if (!flowValidator(faRef.current.value)) {
      setFaNameError("عنوان فارسی فلوچارت نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!flowValidator(enRef.current.value)) {
      setEnNameError("عنوان انگلیسی فلوچارت نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!flowValidator(descRef.current.value)) {
      setDescError("توضیحات فلوچارت نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!valid) return;
    onEdit(enRef.current.value, faRef.current.value, descRef.current.value);
  };

  return (
    <>
      <Modal
        open={modal.modalStates.isEditFlowModalOpen}
        onClose={closeModalHandler}
        label="edit-flow-modal"
        title={"ویرایش فلوچارت"}
        description={
          "برای ویرایش فلوچارت، وارد کردن عنوان فارسی، عنوان انگلیسی و توضیحات الزامی می‌باشد."
        }
        actions={[
          {
            type: "primary",
            label: "ویرایش فلوچارت",
            icon: <EditIcon />,
            onClickHandler: onConfirm,
          },
          {
            type: "cancel",
            label: "انصراف",
            icon: <CloseIcon />,
            onClickHandler: closeModalHandler,
          },
        ]}
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <TextField
              id="flow-fa-title"
              label="عنوان فارسی فلوچارت"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={faNameError !== ""}
              helperText={faNameError}
              inputRef={faRef}
              defaultValue={nameFA}
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              id="flow-en-title"
              label="عنوان انگلیسی فلوچارت"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={enNameError !== ""}
              helperText={enNameError}
              inputRef={enRef}
              defaultValue={nameEN}
            />
          </div>
          <div className="col-md-12 mb-3">
            <TextField
              id="flow-description"
              label="توضیحات"
              type="text"
              fullWidth
              variant="standard"
              autoComplete={"off"}
              error={descError !== ""}
              helperText={descError}
              inputRef={descRef}
              defaultValue={description}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Edit;
