import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { Button, TextField } from "@mui/material";
import useSnak from "@hooks/useSnak";
import localStorageHelper from "@utils/localStrogeHelper";
import checkerValidator from "@utils/checkerValidator";
import createChecker from "@services/checkers/createChecker";

const Add = ({ updateListHandler, onClose }) => {
  const [titleError, setTitleError] = useState("");
  const titleRef = useRef();

  const [UrlError, setUrlError] = useState("");
  const UrlRef = useRef();

  const modal = useModal();
  const { showSnak } = useSnak();
  const closeModalHandler = () => {
    setTitleError("");
    setUrlError("");
    modal.close();
    if (onClose) onClose();
  };

  const onConfirm = async () => {
    setTitleError("");
    setUrlError("");
    let valid = true;
    if (!checkerValidator(titleRef.current.value)) {
      setTitleError("عنوان چکر نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!checkerValidator(UrlRef.current.value)) {
      setUrlError("URL چکر نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!valid) return;
    showSnak({ type: "warning", message: "در حال افزودن چکر..." });
    try {
      const res = await createChecker(
        `checker/create`,
        localStorageHelper.load("token"),
        { title: titleRef.current.value, url: UrlRef.current.value }
      );
      updateListHandler(res);
      showSnak({ type: "success", message: "چکر با موفقیت افزوده شد." });
      modal.close();
    } catch (error) {
      if (error.message === "409") {
        showSnak({
          type: "error",
          message: "نام چکر تکراری می‌باشد.",
        });
        return;
      }
      showSnak({
        type: "error",
        message: "افزودن چکر با خطا مواجه شد.",
      });
    }
  };

  return (
    <>
      <Modal
        open={modal.modalStates.isAddCheckerModalOpen}
        onClose={closeModalHandler}
        label="delete-announcement-modal"
        title={"افزودن چکر جدید"}
        description={
          "برای افزودن چکر جدید، وارد کردن عنوان چکر و URL الزامی می‌باشد."
        }
        actions={[
          {
            type: "success",
            label: "افزودن چکر جدید",
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
        <div className="mb-3">
          <TextField
            id="checker-title"
            label="عنوان چکر"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            error={titleError !== ""}
            helperText={titleError}
            inputRef={titleRef}
          />
        </div>
        <div className="mb-3">
          <TextField
            id="checker-url"
            label="URL چکر"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            error={UrlError !== ""}
            helperText={UrlError}
            inputRef={UrlRef}
          />
        </div>
      </Modal>
    </>
  );
};

export default Add;
