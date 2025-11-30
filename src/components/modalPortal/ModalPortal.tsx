import { Activity } from "react";
import HintModal from "../hintModal/HintModal";
import InfoModal from "../infoModal/InfoModal";
import ResultsModal from "../resultsModal/ResultsModal";
import styles from "./ModalPortal.module.css";
import closeIcon from "/closeIcon.svg";

interface ModalPortalProps {
    modalInfo: { 
        shouldShowModal: boolean;
        modalToShow: string | null;
    },
    handleCloseModal: () => void;
};

export default function ModalPortal({ modalInfo, handleCloseModal }: ModalPortalProps) {
    const shouldShowInfoModal = modalInfo.modalToShow === "infoModal";
    const shouldShowHintModal = modalInfo.modalToShow === "hintModal";
    const shouldShowResultsModal = modalInfo.modalToShow === "resultsModal";

    return (
        modalInfo.shouldShowModal && (
        <div className={styles.modalBackground}>
            <dialog className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={handleCloseModal}>
                    <img src={closeIcon} alt="" />
                </button>
                <Activity mode={shouldShowInfoModal ? "visible" : "hidden"} >
                    <InfoModal handlePlayButton={handleCloseModal} />
                </Activity>
                <Activity mode={shouldShowHintModal ? "visible" : "hidden"} >
                    <HintModal handleCloseButton={handleCloseModal} />
                </Activity>
                <Activity mode={shouldShowResultsModal ? "visible" : "hidden"} >
                    <ResultsModal 
                        handleCloseButton={handleCloseModal}
                    />
                </Activity>
            </dialog>
        </div>
        )
    )
};