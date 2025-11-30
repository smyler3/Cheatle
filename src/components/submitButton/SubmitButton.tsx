import styles from "./SubmitButton.module.css";
import { useModal } from "../../hooks/modal/useModal";

const SubmitButton = () => {
    const { openResultsModal } = useModal();
    return (
        <button
            className={styles.button}
            onClick={openResultsModal}
        >
            Finish
        </button>
    )
};

export default SubmitButton;