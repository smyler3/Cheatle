import { Activity } from "react";
import HintModal from "../hintModal/HintModal";
import InfoModal from "../infoModal/InfoModal";
import ResultsModal from "../resultsModal/ResultsModal";
import styles from "./ModalPortal.module.css";

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
        <div className={styles.modalBackground}>
            <dialog>
                    <Activity mode={shouldShowInfoModal ? "visible" : "hidden"} >
                        <InfoModal />
                    </Activity>
                    <Activity mode={shouldShowHintModal ? "visible" : "hidden"} >
                        <HintModal />
                    </Activity>
                    <Activity mode={shouldShowResultsModal ? "visible" : "hidden"} >
                        <ResultsModal />
                    </Activity>
                <button className={styles.closeButton} onClick={handleCloseModal}>
                    Close
                </button>
            </dialog>
        </div>
    )
};