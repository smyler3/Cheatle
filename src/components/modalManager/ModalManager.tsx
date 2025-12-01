import { Activity } from "react";
import HintModal from "../hintModal/HintModal";
import InfoModal from "../infoModal/InfoModal";
import ResultModal from "../resultModal/ResultModal";
import styles from "./ModalManager.module.css";
import closeIcon from "/closeIcon.svg";
import { useModal } from "../../hooks/modal/useModal";
import { ModalName } from "../../constants";

export default function ModalManager() {
    const { modalInfo, closeModal } = useModal();
    const shouldShowInfoModal = modalInfo.modalToShow === ModalName.InfoModal;
    const shouldShowHintModal = modalInfo.modalToShow === ModalName.HintModal;
    const shouldShowResultModal = modalInfo.modalToShow === ModalName.ResultModal;

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
                <Activity mode={shouldShowResultModal ? "visible" : "hidden"} >
                    <ResultModal />
                </Activity>
            </dialog>
        </div>
        )
    )
};