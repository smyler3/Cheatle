import { useContext } from "react";
import { createContext } from "react";

type ModalContextType = {
  modalInfo: {
    shouldShowModal: boolean;
    modalToShow: string | null;
  };
  openInfoModal: () => void;
  openHintModal: () => void;
  openResultModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export const useModal = () => useContext(ModalContext);