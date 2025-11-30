import styles from "./SubmitButton.module.css";
import { useModal } from "../../hooks/modal/useModal";

const SubmitButton = () => {
    const { openResultModal } = useModal();
    return (
        <button
            className={styles.button}
            onClick={openResultModal}
        >
            Finish
        </button>
    )
};

export default SubmitButton;