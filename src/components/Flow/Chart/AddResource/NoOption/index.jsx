import { Button } from "@mui/material";
import convertNodeNames from "@utils/convertors/convertNodeNames";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Add from "@cmp/Resources/Checker/Add";
import useModal from "@hooks/useModal";

const NoOption = ({ type }) => {
  const modal = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const updateList = () => {
    console.log("Mohamad");
  };

  const showModalHandler = () => {
    // const hideResourceModal = { isAddResourceModalOpen: false };
    switch (type) {
      case "Checker":
        modal.show({
          isAddCheckerModalOpen: true,
          isAddResourceModalOpen: false,
        });
        break;
      case "Action":
        modal.show({
          isAddActionModalOpen: true,
          isAddResourceModalOpen: false,
        });
        break;
      case "Announcement":
        modal.show({
          isAddAnnouncementModalOpen: true,
          isAddResourceModalOpen: false,
        });
        break;
      case "Question":
        modal.show({
          isAddQuestionModalOpen: true,
          isAddResourceModalOpen: false,
        });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="mb-2">
        <p className="text-center mb-0">داده‌ای یافت نشد.</p>
      </div>
      <div>
        <Button
          variant="contained"
          color="success"
          fullWidth
          startIcon={<AddIcon />}
          onClick={showModalHandler}
        >
          افزودن {convertNodeNames(type)} جدید
        </Button>
      </div>
    </>
  );
};

export default NoOption;
