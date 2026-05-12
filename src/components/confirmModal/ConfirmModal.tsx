import { useGameState } from "../../hooks/gameState/useGameState";
import { useModal } from "../../hooks/modal/useModal";
import styles from "./ConfirmModal.module.css";
import closeIcon from "/closeIcon.svg";

export default function ConfirmModal() {
    const { stopTimer } = useGameState();
    const { closeModal, openResultModal } = useModal(); 

    const handleFinishClick = () => {
        stopTimer();
        openResultModal();
    };

    return (
        <>
            <button className={styles.closeButton} onClick={closeModal}>
                <img src={closeIcon} alt="Close Icon" />
            </button>
            <div className={styles.confirmModal}>
                <h2 className={styles.modalHeading}>Finish game?</h2>
                <p className={styles.tagline}>Are you sure you want to finish the game and submit your score?</p>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.cancelButton}
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.finishButton}
                        onClick={handleFinishClick}
                    >
                        Finish
                    </button>
                </div>
            </div>
        </>
    )
}