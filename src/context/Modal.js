import { createContext, useState } from "react";

export const ModalContext = createContext(null);

const ModalProvider = ({ children, defaultValues }) => {
  const [modalStates, setModalStates] = useState({
    isLogoutModalOpen: false,

    isExitEditFlowModalOpen: false,

    isResetFlowModalOpen: false,
    isSaveFlowModalOpen: false,

    isFlowDuplicateModalOpen: false,

    isDeleteAnnouncementModalOpen: false,
    isAddAnnouncementModalOpen: false,
    isEditAnnouncementModalOpen: false,

    isDeleteQuestionModalOpen: false,
    isAddQuestionModalOpen: false,
    isEditQuestionModalOpen: false,

    isDeleteCheckerModalOpen: false,
    isAddCheckerModalOpen: false,
    isEditCheckerModalOpen: false,

    isDeleteActionModalOpen: false,
    isAddActionModalOpen: false,
    isEditActionModalOpen: false,

    isAddFlowModalOpen: false,
    isEditFlowModalOpen: false,

    isAddResourceModalOpen: false,
    ...defaultValues,
  });

  const show = (context) => {
    setModalStates((prev) => ({
      ...prev,
      ...context,
    }));
  };

  const close = () => {
    setModalStates({
      isLogoutModalOpen: false,

      isDeleteAnnouncementModalOpen: false,
      isAddAnnouncementModalOpen: false,
      isEditAnnouncementModalOpen: false,

      isDeleteQuestionModalOpen: false,
      isAddQuestionModalOpen: false,
      isEditQuestionModalOpen: false,

      isDeleteCheckerModalOpen: false,
      isAddCheckerModalOpen: false,
      isEditCheckerModalOpen: false,

      isDeleteActionModalOpen: false,
      isAddActionModalOpen: false,
      isEditActionModalOpen: false,

      isAddFlowModalOpen: false,
      isEditFlowModalOpen: false,

      isAddResourceModalOpen: false,
    });
  };

  const value = {
    modalStates: { ...modalStates },
    show,
    close,
  };
  console.log(value);
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
