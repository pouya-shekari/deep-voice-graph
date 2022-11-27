import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { Button, TextField } from "@mui/material";
import useSnak from "@hooks/useSnak";
import localStorageHelper from "@utils/localStrogeHelper";
import flowValidator from "@utils/flowValidator";
import createFlow from "@services/flows/createFlow";

const Add = ({ updateListHandler }) => {
  const [faNameError, setFaNameError] = useState("");
  const [enNameError, setEnNameError] = useState("");
  const [descError, setDescError] = useState("");

  const faRef = useRef();
  const enRef = useRef();
  const descRef = useRef();

  const modal = useModal();
  const { showSnak } = useSnak();
  const closeModalHandler = () => {
    setFaNameError("");
    setEnNameError("");
    setDescError("");
    modal.close();
  };

  const showAddModal = () => {
    modal.show({ isAddFlowModalOpen: true });
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
    showSnak({ type: "warning", message: "در حال افزودن فلوچارت..." });

    try {
      const res = await createFlow(
        `flow/create`,
        localStorageHelper.load("token"),
        {
          en: enRef.current.value,
          fa: faRef.current.value,
          desc: descRef.current.value,
        }
      );
      updateListHandler(res);
      showSnak({ type: "success", message: "فلوچارت با موفقیت افزوده شد." });
      modal.close();
    } catch (error) {
      if (error.message === "409") {
        showSnak({
          type: "error",
          message: "نام فلوچارت تکراری می‌باشد.",
        });
        return;
      }
      showSnak({
        type: "error",
        message: "افزودن فلوچارت با خطا مواجه شد.",
      });
    }
  };

  return (
    <>
      <Modal
        open={modal.modalStates.isAddFlowModalOpen}
        onClose={closeModalHandler}
        label="add-flow-modal"
        title={"افزودن فلوچارت جدید"}
        description={
          "برای افزودن فلوچارت جدید، وارد کردن عنوان فارسی، عنوان انگلیسی و توضیحات الزامی می‌باشد."
        }
        actions={[
          {
            type: "success",
            label: "افزودن فلوچارت جدید",
            icon: <AddIcon />,
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
            />
          </div>
        </div>
      </Modal>
      <div aria-label="add new flow" className="mb-3">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={showAddModal}
        >
          افزودن فلوچارت جدید
        </Button>
      </div>
    </>
  );
};

export default Add;
