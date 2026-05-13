import styles from "./FinishButton.module.css";
import { useModal } from "../../hooks/modal/useModal";
import { useGameState } from "../../hooks/gameState/useGameState";

const FinishButton = () => {
    const { isTimerDone } = useGameState();
    const { openConfirmModal, openResultModal } = useModal();

    return (
        <button
            className={styles.button}
            onClick={isTimerDone ? openResultModal : openConfirmModal}
        >
            FINISH
        </button>
    )
};

export default FinishButton;