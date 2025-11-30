import { useState } from "react";
import { ModalContext } from "./useModal";

type ModalProviderProps = {
    children: React.ReactNode,
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modalInfo, setModalInfo] = useState<{ shouldShowModal: boolean, modalToShow: string | null}>({ shouldShowModal: true, modalToShow: "infoModal" });

    const openInfoModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: "infoModal" });
    };

    const openHintModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: "hintModal" });
    };

    const openResultsModal = () => {
        setModalInfo({ shouldShowModal: true, modalToShow: "resultsModal" });
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