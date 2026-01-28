import styles from "./FinishButton.module.css";
import { useModal } from "../../hooks/modal/useModal";
import { useTimer } from "../../hooks/timer/useTimer";

const FinishButton = () => {
    const { openConfirmModal, openResultModal } = useModal();
    const { isTimerDone } = useTimer();

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