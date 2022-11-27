import Modal from "@cmp/UI/Modal";
import useModal from "@hooks/useModal";
import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { TextField } from "@mui/material";
import announcementValidator from "@utils/announcementValidator";
import useSnak from "@hooks/useSnak";
import createAnnouncement from "@services/annoucements/createAnnouncement";
import localStorageHelper from "@utils/localStrogeHelper";

const Add = ({ updateListHandler, onClose }) => {
  const [error, setError] = useState("");
  const titleRef = useRef();
  const modal = useModal();
  const { showSnak } = useSnak();
  const closeModalHandler = () => {
    setError("");
    modal.close();
    if (onClose) onClose();
  };

  const onConfirm = async () => {
    setError("");
    if (!announcementValidator(titleRef.current.value)) {
      setError("عنوان اعلان نمی‌تواند خالی باشد.");
      return;
    }
    showSnak({ type: "warning", message: "در حال افزودن اعلان..." });

    try {
      const res = await createAnnouncement(
        `announcement/create`,
        localStorageHelper.load("token"),
        titleRef.current.value
      );
      updateListHandler(res);
      showSnak({ type: "success", message: "اعلان با موفقیت افزوده شد." });
      modal.close();
    } catch (error) {
      if (error.message === "409") {
        showSnak({
          type: "error",
          message: "نام اعلان تکراری می‌باشد.",
        });
        return;
      }
      showSnak({
        type: "error",
        message: "افزودن اعلان با خطا مواجه شد.",
      });
    }
  };

  return (
    <>
      <Modal
        open={modal.modalStates.isAddAnnouncementModalOpen}
        onClose={closeModalHandler}
        label="delete-announcement-modal"
        title={"افزودن اعلان جدید"}
        description={
          "برای افزودن اعلان جدید، وارد کردن عنوان اعلان الزامی می‌باشد."
        }
        actions={[
          {
            type: "success",
            label: "افزودن اعلان جدید",
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
            id="ann-title"
            label="عنوان اعلان"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            error={error !== ""}
            helperText={error}
            inputRef={titleRef}
          />
        </div>
      </Modal>
    </>
  );
};

export default Add;
