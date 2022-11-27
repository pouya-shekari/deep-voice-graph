import { Button } from "@mui/material";
import convertNodeNames from "@utils/convertors/convertNodeNames";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import useModal from "@hooks/useModal";

const NoOption = ({ type }) => {
  const modal = useModal();

  const showModalHandler = () => {
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
