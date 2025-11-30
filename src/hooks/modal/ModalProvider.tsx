import { useState } from "react";
import { ModalContext } from "./useModal";
import { ModalName } from "../../constants";
import type { ModalNameType } from "../../types/types";

type ModalProviderProps = {
    children: React.ReactNode,
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modalInfo, setModalInfo] = useState<{ shouldShowModal: boolean, modalToShow: ModalNameType | null}>({ shouldShowModal: true, modalToShow: ModalName.InfoModal });

    const openInfoModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: ModalName.InfoModal });
    };

    const openHintModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: ModalName.HintModal });
    };

    const openResultsModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: ModalName.ResultsModal });
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
                openResultsModal,
                closeModal, 
            }}
        >
            {children}
        </ModalContext.Provider>
    )
};