import styles from "./SubmitButton.module.css";
import { useModal } from "../../hooks/modal/useModal";
import { useTimer } from "../../hooks/timer/useTimer";

const SubmitButton = () => {
    const { stopTimer } = useTimer();
    const { openResultModal } = useModal();

    const handleClick = () => {
        stopTimer();
        openResultModal();
    };

    return (
        <button
            className={styles.button}
            onClick={handleClick}
        >
            Finish
        </button>
    )
};

export default SubmitButton;