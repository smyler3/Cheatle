import { Activity, useRef } from "react";
import HintModal from "../hintModal/HintModal";
import InfoModal from "../infoModal/InfoModal";
import ResultModal from "../resultModal/ResultModal";
import styles from "./ModalManager.module.css";
import { useModal } from "../../hooks/modal/useModal";
import { ModalName } from "../../constants";
import ConfirmModal from "../confirmModal/ConfirmModal";

export default function ModalManager() {
    const { modalInfo } = useModal();
    const modalBackgroundRef = useRef<HTMLDivElement | null>(null);

    const shouldShowInfoModal = modalInfo.modalToShow === ModalName.InfoModal;
    const shouldShowHintModal = modalInfo.modalToShow === ModalName.HintModal;
    const shouldShowConfirmModal = modalInfo.modalToShow === ModalName.ConfirmModal;
    const shouldShowResultModal = modalInfo.modalToShow === ModalName.ResultModal;

    return (
        modalInfo.shouldShowModal && (
        <div className={styles.modalBackground} ref={modalBackgroundRef}>
            <dialog className={styles.modalContainer}>
                <Activity mode={shouldShowInfoModal ? "visible" : "hidden"} >
                    <InfoModal />
                </Activity>
                <Activity mode={shouldShowHintModal ? "visible" : "hidden"} >
                    <HintModal />
                </Activity>
                <Activity mode={shouldShowConfirmModal ? "visible" : "hidden"} >
                    <ConfirmModal />
                </Activity>
                <Activity mode={shouldShowResultModal ? "visible" : "hidden"} >
                    <ResultModal backgroundRef={modalBackgroundRef} />
                </Activity>
            </dialog>
        </div>
        )
    )
};