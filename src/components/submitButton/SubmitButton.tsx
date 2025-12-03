import styles from "./SubmitButton.module.css";
import { useModal } from "../../hooks/modal/useModal";

const SubmitButton = () => {
    const { openConfirmModal } = useModal();

    return (
        <button
            className={styles.button}
            onClick={openConfirmModal}
        >
            Finish
        </button>
    )
};

export default SubmitButton;