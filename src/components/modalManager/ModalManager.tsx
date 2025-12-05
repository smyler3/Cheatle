import { Activity } from "react";
import HintModal from "../hintModal/HintModal";
import InfoModal from "../infoModal/InfoModal";
import ResultModal from "../resultModal/ResultModal";
import styles from "./ModalManager.module.css";
import { useModal } from "../../hooks/modal/useModal";
import { ModalName } from "../../constants";
import ConfirmModal from "../confirmModal/ConfirmModal";
import type { Guess } from "../../types/types";
import type { Word } from "../../schema/CheatleSchema";

type ModalManagerType = {
    guesses: Guess[],
    highestScoringWords: Word[],
};

export default function ModalManager({
    guesses,
    highestScoringWords,
}: ModalManagerType) {
    const { modalInfo } = useModal();
    const shouldShowInfoModal = modalInfo.modalToShow === ModalName.InfoModal;
    const shouldShowHintModal = modalInfo.modalToShow === ModalName.HintModal;
    const shouldShowConfirmModal = modalInfo.modalToShow === ModalName.ConfirmModal;
    const shouldShowResultModal = modalInfo.modalToShow === ModalName.ResultModal;

    return (
        modalInfo.shouldShowModal && (
        <div className={styles.modalBackground}>
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
                    <ResultModal
                        guesses={guesses}
                        highestScoringWords={highestScoringWords}
                    />
                </Activity>
            </dialog>
        </div>
        )
    )
};