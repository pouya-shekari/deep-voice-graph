import { createContext, useState } from "react";

export const ModalContext = createContext(null);

const ModalProvider = ({ children }) => {
  const [modalStates, setModalStates] = useState({
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

  const show = (context) => {
    console.log(context);
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

  const value = { modalStates, show, close };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
