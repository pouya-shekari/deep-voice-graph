import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { TextField } from "@mui/material";
import useSnak from "@hooks/useSnak";
import localStorageHelper from "@utils/localStrogeHelper";

import actionValidator from "@utils/actionValidator";
import createAction from "@services/actions/createAction";

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
    if (!actionValidator(titleRef.current.value)) {
      setTitleError("عنوان اکشن نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!actionValidator(UrlRef.current.value)) {
      setUrlError("URL اکشن نمی‌تواند خالی باشد.");
      valid = false;
    }
    if (!valid) return;
    showSnak({ type: "warning", message: "در حال افزودن اکشن..." });
    try {
      const res = await createAction(
        `action/create`,
        localStorageHelper.load("token"),
        { title: titleRef.current.value, url: UrlRef.current.value }
      );
      updateListHandler(res);
      showSnak({ type: "success", message: "اکشن با موفقیت افزوده شد." });
      modal.close();
    } catch (error) {
      if (error.message === "409") {
        showSnak({
          type: "error",
          message: "نام اکشن تکراری می‌باشد.",
        });
        return;
      }
      showSnak({
        type: "error",
        message: "افزودن اکشن با خطا مواجه شد.",
      });
    }
  };

  return (
    <>
      <Modal
        open={modal.modalStates.isAddActionModalOpen}
        onClose={closeModalHandler}
        label="delete-action-modal"
        title={"افزودن اکشن جدید"}
        description={
          "برای افزودن اکشن جدید، وارد کردن عنوان اکشن و URL الزامی می‌باشد."
        }
        actions={[
          {
            type: "success",
            label: "افزودن اکشن جدید",
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
            id="action-title"
            label="عنوان اکشن"
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
            id="action-url"
            label="URL اکشن"
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
