import { useState } from "react";
import { ModalContext } from "./useModal";
import { ModalName } from "../../constants";
import type { ModalNameType } from "../../types/types";

type ModalProviderProps = {
    children: React.ReactNode,
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modalInfo, setModalInfo] = useState<{ shouldShowModal: boolean, modalToShow: ModalNameType | null}>({ shouldShowModal: false, modalToShow: null });

    const openInfoModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: ModalName.InfoModal });
    };

    const openHintModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: ModalName.HintModal });
    };

    const openConfirmModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: ModalName.ConfirmModal });
    }

    const openResultModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: ModalName.ResultModal });
    };

    const closeModal = () => {
        setModalInfo({ shouldShowModal: false, modalToShow: null });
    };

    return (
        <ModalContext.Provider 
            value={{
                modalInfo, 
                openInfoModal,
                openHintModal,
                openConfirmModal,
                openResultModal,
                closeModal, 
            }}
        >
            {children}
        </ModalContext.Provider>
    )
};