import { Activity } from "react";
import HintModal from "../hintModal/HintModal";
import InfoModal from "../infoModal/InfoModal";
import ResultsModal from "../resultsModal/ResultsModal";
import styles from "./ModalPortal.module.css";
import closeIcon from "/closeIcon.svg";
import { useModal } from "../../hooks/modal/useModal";
import { ModalName } from "../../constants";

export default function ModalPortal() {
    const { modalInfo, closeModal } = useModal();
    const shouldShowInfoModal = modalInfo.modalToShow === ModalName.InfoModal;
    const shouldShowHintModal = modalInfo.modalToShow === ModalName.HintModal;
    const shouldShowResultsModal = modalInfo.modalToShow === ModalName.ResultsModal;

    return (
        modalInfo.shouldShowModal && (
        <div className={styles.modalBackground}>
            <dialog className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={closeModal}>
                    <img src={closeIcon} alt="" />
                </button>
                <Activity mode={shouldShowInfoModal ? "visible" : "hidden"} >
                    <InfoModal />
                </Activity>
                <Activity mode={shouldShowHintModal ? "visible" : "hidden"} >
                    <HintModal />
                </Activity>
                <Activity mode={shouldShowResultsModal ? "visible" : "hidden"} >
                    <ResultsModal />
                </Activity>
            </dialog>
        </div>
        )
    )
};