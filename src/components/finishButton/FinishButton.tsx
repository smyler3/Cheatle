import styles from "./FinishButton.module.css";
import { useModal } from "../../hooks/modal/useModal";

const FinishButton = () => {
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

export default FinishButton;